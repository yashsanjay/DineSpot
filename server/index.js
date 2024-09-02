const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/restaurantRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/restaurants", restaurantRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const PORT = process.env.PORT || 6800;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
