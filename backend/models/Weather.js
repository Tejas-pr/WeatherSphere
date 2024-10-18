const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    date: { type: Date, required: true },
    summary: {
        avg_temp: { type: Number, required: true }, // Average temperature for the day
        max_temp: { type: Number, required: true }, // Maximum temperature for the day
        min_temp: { type: Number, required: true }, // Minimum temperature for the day
        avg_humidity: { type: Number, required: true }, // Average humidity for the day
        avg_wind_speed: { type: Number, required: true }, // Average wind speed for the day
        dominant_condition: { type: String, required: true }, // Dominant weather condition
        icon: { type: String, required: true } // Weather icon URL
    }
});

// Create and export the Weather model
module.exports = mongoose.model("Weather", weatherSchema);