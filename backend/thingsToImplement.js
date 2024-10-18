/*
 https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=${apiKey}&units=${units}

 data formate:
 {
  "coord": {
    "lon": 77.6033,
    "lat": 12.9762
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 26.47,
    "feels_like": 26.47,
    "temp_min": 25.48,
    "temp_max": 27.4,
    "pressure": 1011,
    "humidity": 66,
    "sea_level": 1011,
    "grnd_level": 911
  },
  "visibility": 8000,
  "wind": {
    "speed": 3.6,
    "deg": 260
  },
  "clouds": {
    "all": 40
  },
  "dt": 1729231344,
  "sys": {
    "type": 2,
    "id": 2017753,
    "country": "IN",
    "sunrise": 1729212007,
    "sunset": 1729254539
  },
  "timezone": 19800,
  "id": 1277333,
  "name": "Bengaluru",
  "cod": 200
}
  
thning to implement
- create a route for featching the weather data for a particular city, units - {dt, time, lat, lon, temp, feels_like,max_temp, min_temp, humidity, wind_speed, description, icon}

- create a route for featching the weather according to the summary description by date that i need to store in the database , if the DB already have the data then fetch the data from the DB else update the DB

imperial / metrics - units
*/
