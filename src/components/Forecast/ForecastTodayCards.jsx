import React from 'react';
import windDirection from '../../assets/forecast/wind-direction.svg';
import useWeather from '../../hooks/weatherHook';
import LoadingAnimation from '../LoadingAnimation';
import TodayCard from './TodayCard';

const ForecastTodayCards = () => {
  const weather = useWeather();
  const {
    isLoading, weatherData, forecastData,
  } = weather;

  const handleContent = (type) => {
    if (!weatherData.wind || !weatherData.main) {
      return '';
    }
    const windDegree = weatherData.wind.deg;
    const windSpeed = weatherData.wind.speed;
    const { visibility } = weatherData;
    const { humidity, pressure } = weatherData.main;
    switch (type) {
      case 'windArrow': {
        const imageDegree = 45;
        const invertedDegree = (windDegree + 180) % 360;
        return invertedDegree + imageDegree;
      }
      case 'windDirection': {
        const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
        const stepAngle = 45;
        const directionCount = directions.length;
        const index = Math.round(windDegree / stepAngle) % directionCount;
        return directions[index];
      }
      case 'windSpeed':
        return Math.round(windSpeed);
      case 'humidity':
        return humidity;
      case 'pressure': {
        const convertToMillimeter = Math.round(pressure * 0.75);
        return convertToMillimeter;
      }
      case 'visibility': {
        const convertedValue = Number(visibility) / 1000;
        const roundedValue = Math.floor(convertedValue * 10) / 10;
        return roundedValue;
      }
      default:
        return null;
    }
  };

  return (
    <>
      <div className="forecast-today">Подробно на сегодня</div>
      <section
        className="forecast-today-cards"
        aria-label="Параметры погоды на сегодня"
      >
        <article
          className="today-card today-card-wind"
          aria-label="Скорость ветра"
        >
          {isLoading || !weatherData.id || !forecastData ? (
            <LoadingAnimation />
          ) : (
            <TodayCard
              heading="Скорость ветра"
              content={handleContent('windSpeed')}
              unit="м/c"
              additionalContent={(
                <div className="today-card-circle">
                  <div className="circle direction-arrow">
                    <img
                      src={windDirection}
                      className="wind-direction"
                      alt="Направление ветра"
                      style={{ transform: `rotate(${handleContent('windArrow')}deg)` }}
                    />
                  </div>
                  <div className="circle-direction">{handleContent('windDirection')}</div>
                </div>
              )}
            />
          )}
        </article>
        <article
          className="today-card today-card-humidity"
          aria-label="Влажность"
        >
          {isLoading || !weatherData.id ? (
            <LoadingAnimation />
          ) : (
            <TodayCard
              heading="Влажность"
              content={handleContent('humidity')}
              unit="%"
              additionalContent={(
                <div className="humidity-container">
                  <div className="humidity-numbers">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                  <div className="humidity-scale">
                    <div
                      className="humidity-scale-overlay"
                      style={{ width: `${handleContent('humidity')}%` }}
                    />
                  </div>
                  <div className="humidity-percent">%</div>
                </div>
              )}
            />
          )}
        </article>
        <article className="today-card" aria-label="Видимость">
          {isLoading || !weatherData.id ? (
            <LoadingAnimation />
          ) : (
            <TodayCard heading="Видимость" content={handleContent('visibility')} unit="км" />
          )}
        </article>
        <article className="today-card" aria-label="Давление">
          {isLoading || !weatherData.id ? (
            <LoadingAnimation />
          ) : (
            <TodayCard
              heading="Давление"
              content={handleContent('pressure')}
              unit="мм рт. ст."
              differentSupClass="sup-pressure"
            />
          )}
        </article>
      </section>
    </>
  );
};

export default ForecastTodayCards;
