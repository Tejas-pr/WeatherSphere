# Weather Sphere

Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates.  

The system retrieves data from the OpenWeatherMap API, utilizing data retrieved from the OpenWeatherMap API. The system calculates daily weather summaries, including average, maximum, and minimum temperatures, as well as identifies the dominant weather condition based on frequency of occurrence. User-configurable alerting thresholds were implemented to monitor temperature, triggering alerts for violations and enabling effective monitoring. The system retrieves weather data at configurable intervals, accurately parses responses, and includes temperature conversion functionalities. Additionally, I extended the system to support other weather parameters such as humidity and wind speed, and integrated functionalities for weather forecasts, enhancing the overall capability and depth of insights provided. Comprehensive test cases were developed to ensure the functionality, correctness, and efficiency of the system across various weather scenarios.  

[DEPLOYED LINK](https://vercel.com/api/toolbar/link/weather-sphere-frontend.vercel.app?via=project-dashboard-alias-list&p=1&page=/)  
[DEMO VIDEO](https://www.loom.com/share/821930449369464c912a2d5579aecad6?sid=ac29d21b-a0e4-4e45-a54c-244ed00aca3d)

## Features

- **Real-Time Weather Monitoring**:  
  Continuous retrieval of up-to-date weather data for major Indian metropolitan cities:

  - **Bengaluru**
  - **Delhi**
  - **Mumbai**
  - **Chennai**
  - **Kolkata**
  - **Hyderabad**

- **Temperature Conversion**:  
  Automatic conversion of temperature values from **Kelvin** to **Celsius** for user-friendly display.

- **Daily Weather Summaries**:  
  Generate comprehensive daily summaries with weather aggregates, including:

  - **Average Temperature**: Overall average temperature for the day.
  - **Maximum Temperature**: Highest recorded temperature of the day.
  - **Minimum Temperature**: Lowest recorded temperature of the day.
  - **Dominant Weather Condition**: The most frequent weather condition throughout the day (e.g., Clear, Cloudy, Rainy).

- **Customizable Alerts**:  
  Set your own alerting thresholds based on:

  - Temperature limits (e.g., receive an alert if the temperature exceeds 40°C).
  - Specific weather conditions (e.g., alerts for storms or rain).

- **Email Notifications**:  
  Receive real-time **email notifications** when any of your weather thresholds are triggered. Stay informed wherever you are.  
  We've optimized the alert-setting process using **Zod** for validation, ensuring that your input is correct and reliable.

- **Visual Graph for Average Temperature**

  - **Visual Representation**: The system includes a visually engaging graph that displays the average temperature trends over time using **Chart.js**. This allows users to easily interpret weather patterns and temperature fluctuations at a glance.

- **Extended Weather Metrics**:  
  In addition to temperature, the system also supports monitoring and displaying other weather parameters, such as:

  - **Humidity**
  - **Wind Speed**
  - **Precipitation**
  - **Visibility**

- **DB Optimization: Entry Limitation Feature:**

  1. **Prevent Traffic Congestion**: Limits the number of entries to 10 per user to avoid database overload and reduce traffic bottlenecks.
  2. **Ensure Data Integrity**: Restricts excessive or redundant entries, keeping the data clean and relevant.
  3. **Boost Performance**: Helps maintain faster query responses and optimized read/write operations for a smoother experience.
  4. **Enhance Resource Management**: Limits entry volume to manage storage efficiently and improve scalability.
  5. **Ensure System Scalability**: This optimization supports system performance and responsiveness as the user base grows.  
     supported
     referenced [documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/?tck=mongodb_ai_chatbot) to implement this functionality.

## Pre-requisites

#### Frontend:

[React](https://react.dev/learn) [React-icons](https://react-icons.github.io/react-icons/)
[React-toastify](https://www.npmjs.com/package/react-toastify)
[Luxon](https://www.npmjs.com/package/luxon)
[Framer-motion](https://www.framer.com/motion/)
[Chatjs](https://www.chartjs.org/docs/latest/charts/line.html)

#### Backend:

[Nodemon](https://www.npmjs.com/package/nodemon)
[Express](https://expressjs.com/)
[Dotenv](https://www.npmjs.com/package/dotenv)
[Mongoose](https://www.npmjs.com/package/mongoose)
[Axios](https://axios-http.com/docs/intro)
[Cors](https://www.npmjs.com/package/cors)
[Nodemailer](https://www.npmjs.com/package/nodemailer)
[Zod](https://www.npmjs.com/package/zod)

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
npm install react-toastify react-icons luxon framer-motion
npm run dev
```

#### Backend Setup

1. Navigate to the backend directory:

```bash
cd WeatherSphere/backend
npm install nodemon express dotenv mongoose nodemailer axios cors
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

## Postman Manual Testing

You can manually test the API endpoints using Postman by following these steps:

1. **Download and Install Postman**: If you haven't already, download Postman from [Postman's official website](https://www.postman.com/downloads/).

2. **Set Up Environment Variables**: Ensure you set the required environment variables in Postman for the requests to work correctly. You can set them in the "Environment" section of Postman. Here are the variables to include:
   - `WEATHER_API_KEY`: Your OpenWeatherMap API key.
   - `GMAIL_PASSKEY`: Your Gmail passkey.
   - `GMAIL_USER`: Your Gmail username.

### Example Test Cases

Here are some example test cases to guide your manual testing:

1. **Get Current Weather Data**

   - **Method**: GET
   - **Endpoint**: `http://localhost:3000/api/weather?city=Bengaluru&unit=metric`
   - **Description**: Fetches current weather data for Bengaluru.
   - **Expected Response**: 200 OK with the current weather data in JSON format.

2. **Get Daily Weather Forecast**

   - **Method**: GET
   - **Endpoint**: `http://localhost:3000/api/weather/forecast/?city=Bengaluru&unit=metric`
   - **Description**: Retrieves the daily weather forecast for Bengaluru based on latitude and longitude.
   - **Expected Response**: 200 OK with the forecast data in JSON format.

3. **Add Weather Data**

   - **Method**: POST
   - **Endpoint**: `http://localhost:3000/api/weather/add`
   - **Body** (JSON):
     ```json
     {
       "city": "Bengaluru",
       "country": "India",
       "lat": 12.9716,
       "lon": 77.5946,
       "date": "2024-10-20",
       "summary": {
         "avg_temp": 25,
         "max_temp": 30,
         "min_temp": 20,
         "avg_humidity": 60,
         "avg_wind_speed": 10,
         "dominant_condition": "Clear",
         "icon": "clear.png"
       }
     }
     ```
   - **Description**: Saves weather data for Bengaluru.
   - **Expected Response**: 201 Created, with a message confirming the data has been saved.

4. **Fetch Weather Data**

   - **Method**: GET
   - **Endpoint**: `http://localhost:3000/api/weather/fetch`
   - **Description**: Retrieves all saved weather data.
   - **Expected Response**: 200 OK with an array of weather data in JSON format.

5. **Simulate Weather Data**

   - **Method**: GET
   - **Endpoint**: `http://localhost:3000/api/weather/simulate?city=Bengaluru&unit=metric`
   - **Description**: Starts the simulation of weather data for London.
   - **Expected Response**: 200 OK with a message indicating that simulation has started.

6. **Delete Weather Data**

   - **Method**: DELETE
   - **Endpoint**: `http://localhost:3000/api/weather/delete/:id`
   - **Description**: Deletes weather data by the specified ID. Replace `:id` with the actual ID of the weather data in DB to delete.
   - **Expected Response**: 200 OK with a message confirming that the data has been deleted.

7. **Set Weather Alert**
   - **Method**: POST
   - **Endpoint**: `http://localhost:3000/api/weather/alerts`
   - **Body** (JSON):
     ```json
     {
       "email": "user@example.com",
       "city": "Bengaluru",
       "threshold": 40
     }
     ```
   - **Description**: Sets a weather alert for Bengaluru.
   - **Expected Response**: 200 OK with a message confirming that the alert has been set.

### Steps to Proceed:

1. Backend Setup: Start your backend server, making sure that all dependencies are installed and the correct port is configured in Postman.
2. Database Configuration: Ensure your MongoDB connection is set up and replace the :id parameter in the delete route with the corresponding \_id from your MongoDB database.
3. Environment Variables: You need to create a .env file (based on .env.example) and set the following environment variables:

- WEATHER_API_KEY: Your OpenWeatherMap API key.
- GMAIL_PASSKEY: Your Gmail passkey.
- GMAIL_USER: Your Gmail username.
  Once these steps are complete, you’ll be able to test all the routes, including weather data simulation, forecast retrieval, data storage, and alerts.

<!-- ## Artifacts to be Submitted -->
<!--
- Docker setup instructions (if applicable).
- Vercel link for the frontend (to be added later). -->

##
Thank You! 👋  
tejas.teju02@gmail.com
