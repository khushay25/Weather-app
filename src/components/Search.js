import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import colors from "../theme/colors";
import { getSuggestions } from "../services/weatherService";

const Search = ({ fetchWeather }) => {
  const { isDarkMode } = useTheme();
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  const handleFetchWeather = async () => {
    setError("");
    try {
      await fetchWeather(city);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchCitySuggestions = async () => {
      if (city) {
        try {
          const suggestionsData = await getSuggestions(city);
          const filteredSuggestions = suggestionsData.filter((suggestion) =>
            suggestion.name.toLowerCase().includes(city.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        } catch (error) {
          setError("Error fetching city suggestions.");
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchCitySuggestions, 200);
    return () => clearTimeout(debounceTimeout);
  }, [city]);

  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
    setShowDropdown(false);
    setError("");
  };

  return (
    <div className="relative flex flex-col items-center sm:flex-row">
      <input
        type="text"
        className="border-2 p-2 text-sm sm:text-base md:pr-28 lg:pr-80 mr-1 rounded-md cursor-pointer"
        style={{
          backgroundColor: isDarkMode
            ? `${colors.dark.secondary}50`
            : `${colors.light.secondary}50`,
          color: isDarkMode ? colors.dark.text : colors.light.text,
          borderColor: `${isDarkMode ? colors.dark.text : colors.light.text}`,
        }}
        placeholder="Enter city"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setShowDropdown(true);
          setError("");
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul
          style={{
            backgroundColor: isDarkMode
              ? `${colors.dark.secondary}50`
              : `${colors.light.secondary}50`,
            color: isDarkMode ? colors.dark.text : colors.light.text,
            borderColor: `${isDarkMode ? colors.dark.text : colors.light.text}`,
          }}
          className="absolute border-2 shadow-lg z-50 top-12 w-full rounded-md"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? `${colors.dark.secondary}70`
                  : `${colors.light.secondary}70`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              className="p-2 cursor-pointer button"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
      <button
        className="p-2 px-12 my-2 text-sm sm:text-base text-center sm:px-2 sm:my-0 rounded-md"
        style={{
          backgroundColor: isDarkMode
            ? `${colors.dark.secondary}50`
            : `${colors.light.secondary}50`,
          color: isDarkMode ? colors.dark.text : colors.light.text,
          border: `2px solid ${
            isDarkMode ? colors.dark.text : colors.light.text
          }`,
        }}
        onClick={handleFetchWeather}
      >
        Get Weather
      </button>
      {error && alert(error)}
    </div>
  );
};

export default Search;
