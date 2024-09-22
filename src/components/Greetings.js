import React, { useEffect, useState } from "react";
import colors from "../theme/colors";
import { useTheme } from "../context/ThemeContext";

const Greetings = ({ weatherData, isFahrenheit }) => {
  const { isDarkMode } = useTheme();
  const [greetingMessage, setGreetingMessage] = useState("");
  const [weatherMessage, setWeatherMessage] = useState("");

  const convertToFahrenheit = (tempC) => ((tempC * 9) / 5 + 32).toFixed(2);

  const getTimeBasedGreeting = (localTime) => {
    const hours = new Date(localTime).getHours();

    if (hours >= 5 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 18) return "Good Afternoon";
    if (hours >= 18 && hours < 24) return "Good Evening";
    return "Good Night"; // since we're late night hard workers ;)
  };

  const getWeatherMessage = (conditionText) => {
    switch (conditionText.toLowerCase()) {
      case "sunny":
        return "Don't forget your SPF, it's sunny outside!";
      case "partly cloudy":
      case "cloudy":
        return "When life gives you clouds, find the silver lining!";
      case "rainy":
      case "Patchy rain nearby":
      case "Moderate rain":
      case "overcast":
      case "mist":
      case "light rain":
        return "Don't forget your Umbrella!";
      case "snow":
        return "It's officially Cocoa Season :) Stay warm, it's snowing outside!";
      default:
        return "Wherever you go, no matter what the weather, always bring your own sunshine :)";
    }
  };

  useEffect(() => {
    if (weatherData && weatherData.location && weatherData.current) {
      const localTime = weatherData.location.localtime;
      const conditionText = weatherData.current.condition.text;

      setGreetingMessage(getTimeBasedGreeting(localTime));
      setWeatherMessage(getWeatherMessage(conditionText));
    } else {
      setGreetingMessage("Loading...");
      setWeatherMessage("");
    }
  }, [weatherData]);

  return (
    <div className="my-16 grid grid-cols-2 justify-between items-center">
      <div>
        <h2
          className="font-extrabold text-3xl sm:text-5xl lg:text-7xl max-w-xs sm:max-w-sm"
          style={{ color: isDarkMode ? colors.dark.text : colors.light.text }}
        >
          {greetingMessage || "Greetings!"}
        </h2>
        <p
          className="font-semibold text-xs  sm:text-lg lg:text-xl mt-4 mb-8 max-w-xs md:max-w-md"
          style={{ color: isDarkMode ? colors.dark.text : colors.light.text }}
        >
          {weatherMessage || "Fetching weather data..."}
        </p>
      </div>
      {weatherData && weatherData.current ? (
        <div
          className="flex flex-col items-end"
          style={{ color: isDarkMode ? colors.dark.text : colors.light.text }}
        >
          <p className="font-extrabold text-3xl sm:text-7xl lg:text-9xl">
            {isFahrenheit
              ? `${convertToFahrenheit(weatherData.current.temp_c)}°F` // Use temp_c
              : `${weatherData.current.temp_c}°C`}
          </p>
          <p className="font-semibold text-xs sm:text-lg lg:text-xl flex items-center">
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
            {weatherData.current.condition.text}
          </p>
          <p className="font-semibold text-xs sm:text-base md:text-lg lg:text-xl md:-mt-2">
            {window.innerWidth >= 640
              ? `${weatherData.location.name}, ${weatherData.location.country}`
              : weatherData.location.name}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Greetings;
