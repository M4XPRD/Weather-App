import React, { useState } from 'react';
import ForecastCardsSection from './ForecastCardsSection';

const ForecastWeatherCards = () => {
  const [activeCard, setActiveCard] = useState('weekly');

  const weeklyClasses = `navigation-weekly ${
    activeCard === 'weekly' ? 'active' : ''
  } ${activeCard !== 'weekly' ? 'hide' : ''} ${
    activeCard !== 'weekly' ? 'non-active' : ''
  }`;

  const hourlyClasses = `navigation-hourly ${
    activeCard === 'hourly' ? 'active' : ''
  } ${activeCard !== 'hourly' ? 'hide' : ''} ${
    activeCard !== 'hourly' ? 'non-active' : ''
  }`;

  return (
    <>
      <nav className={`forecast-navigation ${activeCard === 'weekly' ? 'weekly-margin' : ''}`}>
        <div className="navigation-main">Прогноз</div>
        <button
          onClick={() => setActiveCard('weekly')}
          type="button"
          className={weeklyClasses}
        >
          на неделю
        </button>
        <button
          onClick={() => setActiveCard('hourly')}
          type="button"
          className={hourlyClasses}
        >
          почасовой
        </button>
      </nav>
      {activeCard === 'weekly' ? (<ForecastCardsSection type="weekly" />) : (<ForecastCardsSection type="hourly" />)}
    </>
  );
};

export default ForecastWeatherCards;
