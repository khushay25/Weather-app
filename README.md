# Weather Forecast Application

This is a weather forecast application built using **ReactJS** and **Tailwind CSS**. The app allows users to search for current weather conditions by city and displays a greeting message along with weather-specific suggestions based on the time of day and weather conditions. The application is optimized for performance, supports light and dark modes, uses caching for enhanced performance, and has a fully responsive UI for various screen sizes.

## Features

### 1. **City Search with Autocomplete**
   - Users can search for cities using an input field with an autocomplete dropdown.
   - Upon selecting a city, the weather data for that city is fetched and displayed.
   - Error handling is integrated to show appropriate messages when the city is not found or if there's a network issue.

### 2. **Dynamic Greeting Messages**
   - The application provides a greeting message based on the time of day and weather conditions in the searched city (e.g., "Good morning, it's sunny outside, don't forget your SPF!").
   - The default city is New York, and the message updates based on user search.

### 3. **Caching with LocalStorage**
   - The application uses localStorage to cache weather data for each searched city, improving performance by avoiding redundant API calls.
   - Cached data is refreshed every 10 minutes to ensure that users always have updated weather information.

### 4. **Light/Dark Mode Theme**
   - The app supports light and dark modes.
   - The theme can be toggled manually and is remembered using localStorage for future visits.
   - The theme folder contains predefined colors for light and dark modes, ensuring consistent styling throughout the application.

### 5. **Lazy Loading for Performance Optimization**
   - Lazy loading is implemented for weather icons and other heavy assets to improve the initial loading time and overall performance of the application.
   - Non-critical resources are loaded only when needed, reducing bandwidth usage and improving the user experience.

### 6. **Responsive UI**
   - The application is fully responsive, ensuring a seamless experience across various devices, including desktops, tablets, and smartphones.
   - The layout adapts gracefully to different screen sizes, providing a consistent user interface.

### 7. **Error Handling**
   - The app gracefully handles different types of errors such as city not found or network issues and displays user-friendly messages in such cases.

### 8. **Tailwind CSS for Styling**
   - **Tailwind CSS** is used to style the application, ensuring rapid development and a consistent design system.
   - Tailwind provides utility-first classes, which makes customization easier and keeps the CSS file size smaller.

## Performance Optimizations
   - **Lazy Loading**: Heavy resources like weather icons are lazy-loaded, improving performance by reducing the time taken for the initial load.
   - **Caching**: LocalStorage is used to cache responses from the weather API for each city, reducing API requests and improving load times for frequent searches.
   - **Minimized API Calls**: Only necessary API calls are made, and previously fetched data is reused from localStorage wherever applicable.

## Technologies Used
   - **ReactJS**: For building the UI components and managing state.
   - **Tailwind CSS**: For styling the app with utility-first classes.
   - **WeatherAPI**: To fetch real-time weather data for cities.
   - **CSS Flexbox and Grid**: To achieve responsive layouts.
   - **LocalStorage**: For caching weather data and saving user preferences (like theme mode).

## Getting Started

### Prerequisites
To run this project locally, you'll need:
   - **Node.js** installed on your machine.
   - A **WeatherAPI** key from [WeatherAPI.com](https://www.weatherapi.com/) for fetching weather data.

### Installation and Running Locally

1. **Clone the repository:**
   git clone (https://github.com/khushay25/Weather-app/)
   
2. **Navigate to Project Directory:**
   cd weather-forecast-app
   
3. **Install the dependencies:**
   npm install
   
4. **Add your WeatherAPI key:**
   - Create a .env file in the root of the project.
   - Add your WeatherAPI key in the .env file:
     REACT_APP_WEATHER_API_KEY=your_weather_api_key

5. **Run the app locally:**
   npm start

6. **Open the application in your browser:**
   The app will run on http://localhost:3000/

#### Folder Structure
weather-forecast-app/
│
├── src/
│   ├── components/         # Reusable UI components
│   ├── services/           # Web service logic for fetching weather data
│   ├── theme/              # Theme folder with light and dark mode colors
│   ├── assets/             # Images and weather icons
│   ├── App.js              # Main application file
│   └── index.js            # Entry point for the React app
│
├── public/                 # Public files (index.html, favicon, etc.)
├── .env                    # Environment variables for WeatherAPI key
├── postcss.config.js       # PostCSS configuration for Tailwind CSS
├── tailwind.config.js      # Tailwind CSS configuration file
├── package.json            # Dependencies and scripts
└── README.md               # Documentation for the app

#### Future Improvements
- Notifications for Severe Weather
- Multi-language Support
- Animations and Transitions
   
