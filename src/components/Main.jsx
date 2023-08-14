import React, { useCallback, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Forecast from './Forecast/Forecast';
import useWeather from '../hooks/weatherHook';
import useNightMode from '../hooks/nightModeHook';
import useSearchLocation from '../hooks/searchLocationHook';

const Main = () => {
  const weather = useWeather();
  const nightMode = useNightMode();
  const searchLocation = useSearchLocation();

  const { isNightModeOn } = nightMode;
  const { currentLocation } = searchLocation;
  const {
    handleWeatherData,
    handleForecastData,
    setIsLoading,
  } = weather;

  const locationData = currentLocation;
  const APIkey = process.env.REACT_APP_WEATHER_APP_KEY;

  const parseData = useCallback(async (type) => {
    const { lat, lon } = locationData;
    const parseLink = `https://api.openweathermap.org/data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=ru`;
    const parsedData = await fetch(parseLink);
    const rawData = await parsedData.json();
    switch (type) {
      case 'weather': {
        handleWeatherData(rawData);
        break;
      }
      case 'forecast': {
        handleForecastData(rawData.list);
        break;
      }
      default:
        break;
    }
  }, [APIkey, handleForecastData, handleWeatherData, locationData]);

  useEffect(() => {
    setIsLoading(true);
    const parseWeather = () => {
      try {
        setTimeout(async () => {
          parseData('weather');
        }, 1000);
        setTimeout(async () => {
          parseData('forecast');
        }, 1000);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    parseWeather();
  }, [parseData, setIsLoading]);

  return (
    <div className={`weather-app ${isNightModeOn ? 'night-on' : ''}`}>
      <Sidebar />
      <Forecast />
    </div>
  );
};

export default Main;
