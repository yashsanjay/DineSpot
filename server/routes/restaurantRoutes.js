const fs = require("fs");
const express = require("express");
const multer = require("multer");
const env = require("dotenv");

env.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const fileManager = new GoogleAIFileManager(process.env.GEMINI_KEY);
const router = express.Router();
const Restaurant = require("../models/Restaurant");

const upload = multer({ dest: "uploads/" });

router.get("/featured", async (req, res) => {
  try {
    const limit = 6;
    const featuredRestaurants = await Restaurant.find().limit(limit);
    res.json(featuredRestaurants);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/cities", async (req, res) => {
  try {
    const cities = await Restaurant.find().distinct("city");
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/cuisines", async (req, res) => {
  try {
    const cuisines = await Restaurant.find().distinct("cuisines");
    res.json(cuisines);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/search/location", async (req, res) => {
  try {
    const { lat, long, radius } = req.query;

    if (!lat || !long || !radius) {
      return res.status(400).send("Missing required query parameters.");
    }

    const radiusInRadians = parseFloat(radius) / 6378.1;

    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(long), parseFloat(lat)],
            radiusInRadians,
          ],
        },
      },
    });

    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/search/image", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).send("No image uploaded");
    }

    const prompt =
      "Answer in one word: Which cuisine is represented in the image from the given options?? [French, Japanese, Desserts, Seafood, Asian, Filipino, Indian, Sushi, Korean, Chinese, European, Mexican, American, Ice Cream, Cafe, Italian, Pizza, Bakery, Mediterranean, Fast Food, Brazilian, Arabian, Bar Food, Grill, International, Peruvian, Latin American, Burger, Juices, Healthy Food, Beverages, Lebanese, Sandwich, Steak, BBQ, Gourmet Fast Food, Mineira, North Eastern, Coffee and Tea, Vegetarian, Tapas, Breakfast, Diner, Southern, Southwestern, Spanish, Argentine, Caribbean, German, Vietnamese, Thai, Modern Australian, Teriyaki, Cajun, Canadian, Tex-Mex, Middle Eastern, Greek, Bubble Tea, Tea, Australian, Fusion, Cuban, Hawaiian, Salad, Irish, New American, Soul Food, Turkish, Pub Food, Persian, Continental, Singaporean, Malay, Cantonese, Dim Sum, Western, Finger Food, British, Deli, Indonesian, North Indian, Mughlai, Biryani, South Indian, Pakistani, Afghani, Hyderabadi, Rajasthani, Street Food, Goan, African, Portuguese, Gujarati, Armenian, Mithai, Maharashtrian, Modern Indian, Charcoal Grill, Malaysian, Burmese, Chettinad, Parsi, Tibetan, Raw Meats, Kerala, Belgian, Kashmiri, South American, Bengali, Iranian, Lucknowi, Awadhi, Nepalese, Drinks Only, Oriya, Bihari, Assamese, Andhra, Mangalorean, Malwani, Cuisine Varies, Moroccan, Naga, Sri Lankan, Peranakan, Sunda, Ramen, Kiwi, Asian Fusion, Taiwanese, Fish and Chips, Contemporary, Scottish, Curry, Patisserie, South African, Durban, Kebab, Turkish Pizza, Izgara, World Cuisine]";

    const uploadResult = await fileManager.uploadFile(image.path, {
      mimeType: image.mimetype || "image/jpeg",
      displayName: "Food",
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResult.file.mimeType,
          fileUri: uploadResult.file.uri,
        },
      },
      { text: prompt },
    ]);

    const filterCuisine = result.response.text().replace("Answer:", "").trim();

    await fileManager.deleteFile(uploadResult.file.name);

    fs.unlink(image.path, (err) => {
      if (err) {
        console.error("Error deleting local uploaded file:", err);
      }
    });

    const restaurants = await Restaurant.find({ cuisines: filterCuisine });

    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      averageCostForTwo,
      cuisines,
      rating,
    } = req.query;

    const limitNumber = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

    if (
      isNaN(limitNumber) ||
      isNaN(pageNumber) ||
      limitNumber <= 0 ||
      pageNumber <= 0
    ) {
      return res.status(400).send("Invalid pagination parameters");
    }

    const matchStage = {};

    if (city) {
      matchStage.city = city;
    }

    if (averageCostForTwo) {
      matchStage.averageCostForTwo = { $lte: parseFloat(averageCostForTwo) };
    }

    if (cuisines) {
      matchStage.cuisines = {
        $in: cuisines.split(",").map((cuisine) => cuisine.trim()),
      };
    }

    const pipeline = [{ $match: matchStage }];

    if (rating) {
      pipeline.push({
        $addFields: {
          aggregateRatingNumber: {
            $convert: {
              input: "$aggregateRating",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      });

      pipeline.push({
        $match: {
          aggregateRatingNumber: { $gte: parseFloat(rating) },
        },
      });
    }

    const countPipeline = [...pipeline, { $count: "totalCount" }];
    const countResult = await Restaurant.aggregate(countPipeline);
    const totalCount = countResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limitNumber);

    pipeline.push({ $skip: (pageNumber - 1) * limitNumber });
    pipeline.push({ $limit: limitNumber });

    const restaurants = await Restaurant.aggregate(pipeline);

    res.json({
      page: pageNumber,
      totalPages,
      totalCount,
      restaurants,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      restaurantId: req.params.id,
    });

    if (!restaurant) {
      return res.status(404).send("Restaurant not found");
    }

    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;