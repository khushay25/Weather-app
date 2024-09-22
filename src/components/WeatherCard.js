import React from "react";
import colors from "../theme/colors";
import { useTheme } from "../context/ThemeContext";

const WeatherCard = ({ forecastData, isFahrenheit }) => {
  const { isDarkMode } = useTheme();

  const convertToFahrenheit = (tempC) => ((tempC * 9) / 5 + 32).toFixed(2);

  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[new Date(date).getDay()];
  };

  return (
    <div
      className="relative z-10 text-center border-2 rounded-md p-4"
      style={{
        borderColor: isDarkMode ? colors.dark.border : colors.light.border,
        backgroundColor: isDarkMode
          ? `${colors.dark.background}50`
          : `${colors.light.background}50`,
      }}
    >
      {forecastData && forecastData.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 xl:grid-cols-5">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className="p-4 rounded-md text-center"
              style={{
                color: isDarkMode ? colors.dark.text : colors.light.text,
                borderColor: isDarkMode
                  ? colors.dark.border
                  : colors.light.border,
                backgroundColor: isDarkMode
                  ? `${colors.dark.secondary}50`
                  : `${colors.light.secondary}50`,
              }}
            >
              <h3 className="text-2xl lg:text-lg font-semibold">
                {getDayOfWeek(day.date)}
              </h3>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="mx-auto"
              />
              <p className="text-xl lg:text-lg">
                {isFahrenheit
                  ? `${convertToFahrenheit(
                      day.day.maxtemp_c
                    )}°F / ${convertToFahrenheit(day.day.mintemp_c)}°F`
                  : `${day.day.maxtemp_c}°C / ${day.day.mintemp_c}°C`}
              </p>
              <p className="text-xl lg:text-lg">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
