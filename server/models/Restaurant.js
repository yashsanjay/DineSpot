const mongoose = require("mongoose");

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
  ratings: [
    {
      userId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;