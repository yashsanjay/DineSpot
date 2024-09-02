const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const restaurantSchema = new mongoose.Schema({
  restaurantId: String,
  restaurantName: String,
  countryCode: String,
  city: String,
  address: String,
  locality: String,
  localityVerbose: String,
  longitude: Number,
  latitude: Number,
  cuisines: String,
  averageCostForTwo: Number,
  currency: String,
  hasTableBooking: String,
  hasOnlineDelivery: String,
  isDelivering: String,
  switchToOrderMenu: String,
  priceRange: Number,
  aggregateRating: String,
  ratingColor: String,
  ratingText: String,
  votes: Number,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
fs.createReadStream("zomato.csv")
  .pipe(csv())
  .on("data", (row) => {
    const restaurant = new Restaurant({
      restaurantId: row["Restaurant ID"],
      restaurantName: row["Restaurant Name"],
      countryCode: row["Country Code"],
      city: row["City"],
      address: row["Address"],
      locality: row["Locality"],
      localityVerbose: row["Locality Verbose"],
      longitude: parseFloat(row["Longitude"]),
      latitude: parseFloat(row["Latitude"]),
      cuisines: row["Cuisines"],
      averageCostForTwo: parseFloat(row["Average Cost for two"]),
      currency: row["Currency"],
      hasTableBooking: row["Has Table booking"],
      hasOnlineDelivery: row["Has Online delivery"],
      isDelivering: row["Is delivering now"],
      switchToOrderMenu: row["Switch to order menu"],
      priceRange: parseInt(row["Price range"]),
      aggregateRating: row["Aggregate rating"],
      ratingColor: row["Rating color"],
      ratingText: row["Rating text"],
      votes: parseInt(row["Votes"]),
    });

    restaurant
      .save()
      .then(() => console.log("Restaurant saved:", restaurant.restaurantName))
      .catch((error) => console.error("Error saving restaurant:", error));
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
