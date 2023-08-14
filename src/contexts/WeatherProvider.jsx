/* eslint-disable camelcase */
import {
  useState, useMemo, useCallback,
} from 'react';
import WeatherContext from './WeatherContext';

const toFormatDate = (date) => {
  const newDate = new Date(date);
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  const result = `${weekDays[newDate.getDay()]}, ${newDate.getDate()} ${months[newDate.getMonth()]}`;
  return result;
};

const getTemperature = (allWeatherData, currentDate) => {
  const getDataByDays = allWeatherData.filter((location) => {
    const [date] = location.dt_txt.split(' ');
    if (date === currentDate) {
      return true;
    }
    return false;
  });
  const dayTemp = Math.max(...getDataByDays.map((data) => data.main.temp_max)).toFixed(0);
  const nightTemp = Math.min(...getDataByDays.map((data) => data.main.temp_min)).toFixed(0);
  return [dayTemp, nightTemp];
};

const WeatherProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [actualDate, setActualDate] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});

  const handleWeatherData = useCallback((newWeatherData) => {
    const { dt } = newWeatherData;
    const milliseconds = 1000;
    const formattedActualDate = toFormatDate(dt * milliseconds);
    setActualDate(formattedActualDate);
    setWeatherData(newWeatherData);
  }, []);

  const handleForecastData = useCallback((newForecastData) => {
    const result = { weekly: [], hourly: [] };

    newForecastData.reduce((acc, data, index) => {
      const { dt_txt, main, weather } = data;
      const [weatherInfo] = weather;
      const { description, icon } = weatherInfo;
      const [date, time] = dt_txt.split(' ');

      const formattedDate = toFormatDate(date);
      const formattedTime = time.split(':').slice(0, 2).join(':');

      const weeklyItem = result.weekly.find((item) => item.formattedDate === formattedDate);
      const [tempDay, tempNight] = getTemperature(newForecastData, date);
      if (!weeklyItem) {
        result.weekly.push({
          formattedDate,
          icon,
          tempDay,
          tempNight,
          description,
        });
      }

      if (result.hourly.length < 9 && index !== 0) {
        result.hourly.push({
          formattedTime,
          icon,
          temp: main.temp.toFixed(0),
          description,
        });
      }

      return acc;
    }, result);

    setForecastData(result);
  }, []);

  const providedData = useMemo(() => ({
    setIsLoading,
    isLoading,
    weatherData,
    handleWeatherData,
    forecastData,
    setForecastData,
    handleForecastData,
    actualDate,
  }), [
    setIsLoading,
    isLoading,
    weatherData,
    handleWeatherData,
    forecastData,
    setForecastData,
    handleForecastData,
    actualDate,
  ]);

  return (
    <WeatherContext.Provider value={providedData}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
