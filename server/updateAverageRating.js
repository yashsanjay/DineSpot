const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./models/Restaurant");

dotenv.config();

async function updateRestaurants() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const result = await Restaurant.updateMany(
      { averageRating: { $exists: false } },
      { $set: { averageRating: 0, ratings: [] } }
    );

    console.log("Update completed");
    console.log("Matched:", result.matchedCount);
    console.log("Modified:", result.modifiedCount);

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Error updating restaurants:", error);
    await mongoose.connection.close();
  }
}

updateRestaurants();