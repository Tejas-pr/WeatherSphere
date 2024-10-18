const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, required: true },
    summary: {
        avg_temp: { type: Number, required: true },
        max_temp: { type: Number, required: true },
        min_temp: { type: Number, required: true },
        humidity: { type: Number, required: true },
        wind_speed: { type: Number, required: true },
        weather_condition: { type: String, required: true},
        icon: { type: String, required: true }
    }
});

module.exports = mongoose.model("Weather", weatherSchema);