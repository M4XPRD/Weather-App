import React from 'react';
import useWeather from '../../hooks/weatherHook';

const Cards = ({ type, visibilityRange }) => {
  const weather = useWeather();
  const forecastWeekly = weather.forecastData.weekly.slice(1);
  const forecastHourly = weather.forecastData.hourly;

  return type === 'weekly'
    ? forecastWeekly.map(
      ({
        formattedDate, icon, tempDay, tempNight, description,
      }, index) => (
        <article
          className={`weather-card weather-card-${index + 1} ${index >= visibilityRange.from && index < visibilityRange.to ? 'visible' : 'hidden'}`}
          aria-label="Карточка погоды"
          key={`${formattedDate}_${index + 1}`}
        >
          <time className="weather-card-text">
            {index === 0 ? 'Завтра' : formattedDate}
          </time>
          <div className="weather-card-icon-container">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              className="weather-card-icon"
              alt={description}
            />
          </div>
          <div className="weather-card-temperature">
            <span className="weather-card-text">{`${tempDay}°C`}</span>
            <span className="weather-card-text night-temperature">
              {`${tempNight}°C`}
            </span>
          </div>
        </article>
      ),
    )
    : forecastHourly.map(
      ({
        formattedTime, icon, temp, description,
      }, index) => (
        <article
          className={`weather-card weather-card-${index + 1} ${index >= visibilityRange.from && index < visibilityRange.to ? 'visible' : 'hidden'}`}
          aria-label="Карточка погоды"
          key={`${formattedTime}_${index + 1}`}
        >
          <time className="weather-card-text" dateTime={formattedTime}>
            {formattedTime}
          </time>
          <div className="weather-card-icon-container">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              className="weather-card-icon"
              alt={description}
            />
          </div>
          <div className="weather-card-temperature">
            <span className="weather-card-text">{`${temp}°C`}</span>
          </div>
        </article>
      ),
    );
};

export default Cards;
