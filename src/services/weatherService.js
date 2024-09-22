import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

export const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
    return null;
  }
};

export const getSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions", error);
    return [];
  }
};

export const getForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`
    );
    return response.data.forecast.forecastday;
  } catch (error) {
    console.error("Error fetching forecast data", error);
    return [];
  }
};
