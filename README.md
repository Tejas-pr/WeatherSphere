# Weather Sphere

Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system retrieves data from the OpenWeatherMap API.

## Features

- Continuous retrieval of weather data for major Indian metros (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
- Conversion of temperature values from Kelvin to Celsius.
- Daily weather summaries with aggregates:
  - Average temperature
  - Maximum temperature
  - Minimum temperature
  - Dominant weather condition
- User-configurable alerting thresholds for temperature or specific weather conditions.
- Email notifications for triggered alerts.
- Visualizations for daily weather summaries and historical trends.
- Support for additional weather parameters (humidity, wind speed, etc.).

## Design Choices

Real-Time Data Processing: The system fetches weather data from the [OpenWeatherMap API](https://home.openweathermap.org/api_keys) every 5 minutes to ensure real-time monitoring. You can obtain your API key by following the link.

Database: Weather data, including daily summaries, is stored persistently using MongoDB. You can set up your MongoDB cluster through [MongoDB Atlas](https://cloud.mongodb.com/v2/66dd8b9a74044c65c9a75723#/clusters/starterTemplates?from=ctaClusterHeader).

Email Notifications: Alerts and notifications are sent via email using Nodemailer, a Node.js module for sending emails.

Gmail Passkey: To enable email alerts, you’ll need to set up your Gmail passkey. You can get your passkey from [Google](https://myaccount.google.com/signinoptions/passkeys?utm_source=google-account&utm_medium=web&utm_campaign=passkeys-screen&continue=https://myaccount.google.com/security&rapt=AEjHL4OJxDLywFCHBwMUZm_OphAJ6Z8jMYOZnNZa7WtUASonSU-tqfSZT9tfFa7Pi_abziwoAnKiAoJeGeviqB0cX7FCSx-8UqM9XDdak4zgjasYAdpdBdE).

### Setup Instructions

#### Frontend Setup

1. Clone the repository:

```bash
git clone https://github.com/Tejas-pr/WeatherSphere.git
```

2. Install react frontend dependencies:

```bash
cd WeatherSphere/frontend
npm install
npm install react-toastify react-icons react-dom luxon framer-motion
npm run dev
```

#### Backend Setup

1. Navigate to the backend directory:

```bash
cd WeatherSphere/backend
npm i nodemon express dotenv mongoose nodemailer axios cors
```

2. Create a .env file and add:

```.env
PORT = PORT_NUMBER
MONGO_URI = your_mongo_db_connection_string
OPENWEATHERMAP_API_KEY = your_openweathermap_api_key
GMAIL_PASSKEY = "GET_YOUR_GMAIL_PASSKEY"
GMAIL_USER = "GMAIL_USER"
```

3. In package.json add:

```
"scripts": {
    "start": "nodemon server.js"
  },
```

4. Start the backend application:

```bash
npm run dev
```

## Postman Setup

You can easily test all API endpoints using this [Postman collection](https://www.postman.com/science-participant-14299000/workspace/sharing-postman/collection/29097026-c6eaa31a-0f1d-4fd9-8543-188bf6af352c?action=share&creator=29097026). The collection contains pre-configured test cases, which you can run or fork directly in your browser without any local setup. Just ensure that your backend server is running properly.

### Steps to Proceed:

1. Backend Setup: Start your backend server, making sure that all dependencies are installed and the correct port is configured in Postman.
2. Database Configuration: Ensure your MongoDB connection is set up and replace the :id parameter in the delete route with the corresponding \_id from your MongoDB database.
3. Environment Variables: You need to create a .env file (based on .env.example) and set the following environment variables:

- WEATHER_API_KEY: Your OpenWeatherMap API key.
- GMAIL_PASSKEY: Your Gmail passkey.
- GMAIL_USER: Your Gmail username.
  Once these steps are complete, you’ll be able to test all the routes, including weather data simulation, forecast retrieval, data storage, and alerts.

## Artifacts to be Submitted
<!-- 
- Docker setup instructions (if applicable).
- Vercel link for the frontend (to be added later). -->

## Contact

Thank You! 👋  
tejas.teju02@gmail.com  
+91 9538632743
