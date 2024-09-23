import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

export const getWeatherAndForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${city}&days=5`
    );
    return {
      weather: response.data.current,
      forecast: response.data.forecast.forecastday,
      location: response.data.location,
    };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("City not found");
    } else {
      throw new Error("Network error");
    }
  }
};

export const getSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Network error");
  }
};
