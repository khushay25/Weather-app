import React, { useEffect, useState } from "react";
import "./App.css";
import videoSrcLight from "./utils/light-mode-bg.mp4";
import videoSrcDark from "./utils/dark-mode-bg.mp4";
import WeatherCard from "./components/WeatherCard";
import { useTheme } from "./context/ThemeContext";
import { getWeather, getForecast } from "./services/weatherService";
import Greetings from "./components/Greetings";
import Header from "./components/Header";

const App = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("New York");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const fetchWeather = async (city) => {
    const data = await getWeather(city);
    setWeather(data);
    const forecastData = await getForecast(city); // Fetch 5-day forecast
    setForecast(forecastData);
    console.log(data);
    console.log(forecastData);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const toggleUnit = () => {
    setIsFahrenheit((prevUnit) => !prevUnit);
  };

  return (
    <div className="min-h-screen relative w-full flex flex-col px-4 sm:px-8 pb-8 pt-2">
      {/* Video for light mode */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 ${
          isDarkMode ? "hidden" : ""
        }`}
        autoPlay
        loop
        muted
      >
        <source src={videoSrcLight} type="video/mp4" />
      </video>

      {/* Video for dark mode */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 ${
          isDarkMode ? "" : "hidden"
        }`}
        autoPlay
        loop
        muted
      >
        <source src={videoSrcDark} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 z-10"></div>

      <div className="relative z-20 mx-auto max-w-screen-xl w-full">
        <Header
          fetchWeather={fetchWeather}
          isFahrenheit={isFahrenheit}
          toggleUnit={toggleUnit}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <Greetings weatherData={weather} isFahrenheit={isFahrenheit} />
        <WeatherCard forecastData={forecast} isFahrenheit={isFahrenheit} />
      </div>
    </div>
  );
};

export default App;
