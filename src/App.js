import React, {
  useEffect,
  useState,
  lazy,
  startTransition,
  useCallback,
} from "react";
import "./App.css";
import videoSrcLight from "./utils/light-mode-bg.mp4";
import videoSrcDark from "./utils/dark-mode-bg.mp4";
import { useTheme } from "./context/ThemeContext";
import { getWeatherAndForecast } from "./services/weatherService";
import Header from "./components/Header";
const WeatherCard = lazy(() => import("./components/WeatherCard"));
const Greetings = lazy(() => import("./components/Greetings"));

const App = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("New York"); // default city
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [loading, setLoading] = useState(false);

  const CACHE_TTL = 3600000; // 1 hour in milliseconds

  const fetchWeather = useCallback(
    async (city) => {
      setLoading(true);
      try {
        const { weather, forecast, location } = await getWeatherAndForecast(
          city
        );
        setWeather({ current: weather, location });
        setForecast(forecast);

        const weatherCache = {
          city,
          weatherData: { current: weather, location },
          forecastData: forecast,
          timestamp: new Date().getTime(),
          isDarkMode,
          isFahrenheit,
        };

        localStorage.setItem(
          "lastSearchedWeather",
          JSON.stringify(weatherCache)
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [isDarkMode, isFahrenheit]
  );

  useEffect(() => {
    const cachedWeather = localStorage.getItem("lastSearchedWeather");
    if (cachedWeather) {
      const parsedCache = JSON.parse(cachedWeather);
      const isCacheExpired =
        new Date().getTime() - parsedCache.timestamp > CACHE_TTL;

      if (!isCacheExpired) {
        startTransition(() => {
          setCity(parsedCache.city);
          setWeather(parsedCache.weatherData);
          setForecast(parsedCache.forecastData);

          setIsFahrenheit(parsedCache.isFahrenheit ?? false);
          if (
            parsedCache.isDarkMode !== undefined &&
            parsedCache.isDarkMode !== isDarkMode
          ) {
            toggleDarkMode();
          }
        });
      } else {
        fetchWeather(city);
      }
    } else {
      fetchWeather(city);
    }
  }, [city, isDarkMode, toggleDarkMode, fetchWeather]);

  const toggleUnit = () => {
    startTransition(() => {
      const updatedUnit = !isFahrenheit;
      setIsFahrenheit(updatedUnit);

      const cachedWeather = localStorage.getItem("lastSearchedWeather");
      if (cachedWeather) {
        const parsedCache = JSON.parse(cachedWeather);
        parsedCache.isFahrenheit = updatedUnit;
        localStorage.setItem(
          "lastSearchedWeather",
          JSON.stringify(parsedCache)
        );
      }
    });
  };

  const handleToggleDarkMode = () => {
    startTransition(() => {
      toggleDarkMode();

      const cachedWeather = localStorage.getItem("lastSearchedWeather");
      if (cachedWeather) {
        const parsedCache = JSON.parse(cachedWeather);
        parsedCache.isDarkMode = !isDarkMode;
        localStorage.setItem(
          "lastSearchedWeather",
          JSON.stringify(parsedCache)
        );
      }
    });
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
        loading="lazy"
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
        loading="lazy"
      >
        <source src={videoSrcDark} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 z-10"></div>

      <div className="relative z-20 mx-auto max-w-screen-xl w-full">
        <Header
          fetchWeather={fetchWeather}
          isFahrenheit={isFahrenheit}
          toggleUnit={toggleUnit}
          toggleDarkMode={handleToggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <Greetings weatherData={weather} isFahrenheit={isFahrenheit} />
        {loading ? (
          <p className="mx-auto text-7xl flex items-center w-full text-blue-50">
            Loading...
          </p>
        ) : (
          <WeatherCard forecastData={forecast} isFahrenheit={isFahrenheit} />
        )}
      </div>
    </div>
  );
};

export default App;
