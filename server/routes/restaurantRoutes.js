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
      "Answer in one word: Which cuisine is represented in the image?";

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

    const filterCuisine = result.response.text().trim();

    await fileManager.deleteFile(uploadResult.file.name);

    fs.unlink(image.path, () => {});

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
        $match: {
          averageRating: { $gte: parseFloat(rating) },
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

router.post("/:id/rate", async (req, res) => {
  try {
    const { userId, rating } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "You must be logged in to rate",
      });
    }

    const numericRating = Number(rating);

    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const restaurant = await Restaurant.findOne({
      restaurantId: req.params.id,
    });

    if (!restaurant) {
      return res.status(404).send("Restaurant not found");
    }

    const existingRating = restaurant.ratings.find(
      (r) => r.userId === userId
    );

    if (existingRating) {
      existingRating.rating = numericRating;
    } else {
      restaurant.ratings.push({
        userId,
        rating: numericRating,
      });
    }

    const total = restaurant.ratings.reduce((sum, r) => sum + r.rating, 0);
    restaurant.averageRating = total / restaurant.ratings.length;

    await restaurant.save();

    res.json({
      message: existingRating
        ? "Rating updated successfully"
        : "Rating submitted successfully",
      averageRating: restaurant.averageRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;