import React from 'react';
import ForecastWeatherCards from './ForecastWeatherCards';
import ForecastTodayCards from './ForecastTodayCards';

const Forecast = () => (
  <main className="forecast-weather-panel">
    <div className="forecast-container">
      <ForecastWeatherCards />
      <ForecastTodayCards />
    </div>
  </main>
);

export default Forecast;
