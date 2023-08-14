import React, { useEffect, useState } from 'react';
import useWeather from '../../hooks/weatherHook';
import LoadingAnimation from '../LoadingAnimation';
import arrowLeft from '../../assets/forecast/arrow-left.svg';
import arrowRight from '../../assets/forecast/arrow-right.svg';
import Cards from './Cards';

const ForecastCardsSection = ({ type }) => {
  const weather = useWeather();
  const {
    isLoading, forecastData,
  } = weather;

  const [cardsLength, setCardsLength] = useState({
    weekly: 0,
    hourly: 0,
  });
  const [cardsRange, setCardsRange] = useState({
    weekly: {
      from: 0,
      to: 5,
    },
    hourly: {
      from: 0,
      to: 6,
    },
  });

  useEffect(() => {
    if (forecastData.weekly && forecastData.hourly) {
      const weekly = forecastData.weekly.length - 1;
      const hourly = forecastData.hourly.length;
      setCardsLength((prevCardsLength) => ({ ...prevCardsLength, weekly, hourly }));
    }
  }, [setCardsLength, forecastData]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      switch (true) {
        case screenWidth > 1360:
          setCardsRange((prevRange) => ({
            ...prevRange,
            weekly: { from: 0, to: 6 },
            hourly: { from: 0, to: 6 },
          }));
          break;
        case screenWidth < 1360 && screenWidth >= 1200:
          setCardsRange((prevRange) => ({
            ...prevRange,
            weekly: { from: 0, to: 5 },
            hourly: { from: 0, to: 5 },
          }));
          break;
        case screenWidth < 1200 && screenWidth >= 1000:
          setCardsRange((prevRange) => ({
            ...prevRange,
            weekly: { from: 0, to: 4 },
            hourly: { from: 0, to: 4 },
          }));
          break;
        case screenWidth < 1000 && screenWidth >= 834:
          setCardsRange((prevRange) => ({
            ...prevRange,
            weekly: { from: 0, to: 3 },
            hourly: { from: 0, to: 3 },
          }));
          break;
        case screenWidth < 834:
          setCardsRange((prevRange) => ({
            ...prevRange,
            weekly: { from: 0, to: cardsLength.weekly },
            hourly: { from: 0, to: cardsLength.hourly },
          }));
          break;
        default:
          break;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cardsLength]);

  const handlePreviousCard = (cardsType) => {
    setCardsRange((prevRange) => {
      const newFrom = prevRange[cardsType].from - 1;
      const newTo = prevRange[cardsType].to - 1;
      return { ...prevRange, [cardsType]: { from: newFrom, to: newTo } };
    });
  };

  const handleNextCard = (cardsType) => {
    setCardsRange((prevRange) => {
      const newFrom = prevRange[cardsType].from + 1;
      const newTo = prevRange[cardsType].to + 1;
      return { ...prevRange, [cardsType]: { from: newFrom, to: newTo } };
    });
  };

  return (
    <section
      className={`forecast-weather-cards-${type}`}
      aria-label={`Карточки погоды ${type === 'weekly' ? 'на неделю' : 'почасовые'}`}
    >
      <button onClick={() => handlePreviousCard(type)} type="button" className="circle circle-for-arrow" disabled={cardsRange[type].from === 0}>
        <img
          src={arrowLeft}
          className={`arrow arrow-left ${cardsRange[type].from === 0 ? 'blocked' : ''}`}
          alt="Листать влево"
        />
      </button>
      {isLoading || !forecastData || !weather.forecastData[type]
        ? <LoadingAnimation additionalClass="loading-today-section" /> : <Cards type={type} visibilityRange={cardsRange[type]} />}
      <button onClick={() => handleNextCard(type)} type="button" className="circle circle-for-arrow" disabled={cardsRange[type].to >= cardsLength[type]}>
        <img
          src={arrowRight}
          className={`arrow arrow-right ${cardsRange[type].to >= cardsLength[type] ? 'blocked' : ''}`}
          alt="Листать вправо"
        />
      </button>
    </section>
  );
};

export default ForecastCardsSection;
