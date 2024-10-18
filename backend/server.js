const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const weatherRoutes = require("./routes/weatherRoutes"); // Import the weatherRoutes

dotenv.config();
app.use(cors());
app.use(express.json());

// DB connection and Server start
mongoose
  .connect("mongodb+srv://admin:ChGKB5onRYRW3zba@cluster0.6zeco.mongodb.net/Weather-Sphere")
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

// Route for weather-related endpoints
app.use("/api/weather", weatherRoutes); // Use the routes without './'
