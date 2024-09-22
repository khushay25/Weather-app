import React from "react";
import ToggleButton from "./ToggleButton";
import Search from "./Search";

const Header = ({
  fetchWeather,
  isFahrenheit,
  toggleUnit,
  toggleDarkMode,
  isDarkMode,
}) => {
  return (
    <div className=" flex justify-between py-4 items-center">
      {/* Toggle Button for Celsius/Fahrenheit */}
      <ToggleButton
        label="°C / °F"
        onToggle={toggleUnit}
        isActive={isFahrenheit}
      />

      {/* Search component */}
      <Search fetchWeather={fetchWeather} />

      {/* Toggle Button for Dark/Light Mode */}
      <ToggleButton
        label="Dark/ Light"
        onToggle={toggleDarkMode}
        isActive={isDarkMode}
      />
    </div>
  );
};

export default Header;
