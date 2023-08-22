import React from 'react';
import nightModeIcon from '../../assets/sidebar/night-mode-icon.svg';
import clouds from '../../assets/sidebar/clouds.svg';
import mapIcon from '../../assets/sidebar/map-icon.svg';
import useWeather from '../../hooks/weatherHook';
import LoadingAnimation from '../LoadingAnimation';
import useNightMode from '../../hooks/nightModeHook';
import useSearchLocation from '../../hooks/searchLocationHook';

const SidebarInfo = () => {
  const weather = useWeather();
  const nightMode = useNightMode();
  const searchLocation = useSearchLocation();

  const { toggleNightMode } = nightMode;
  const { toggleSearchSidebar } = searchLocation;
  const { locationName } = searchLocation.currentLocation;
  const {
    isLoading,
    weatherData,
    forecastData,
    actualDate,
  } = weather;

  const handleNightMode = () => {
    toggleNightMode();
  };

  const handleSearchSidebar = () => {
    toggleSearchSidebar();
  };

  const handleSidebarContent = (type) => {
    if (!weatherData.id || !weatherData.weather) {
      return '';
    }
    const [weatherInfo] = weatherData.weather;
    const { description } = weatherInfo;
    const temperature = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    switch (type) {
      case 'temperature':
        return Math.round(temperature);
      case 'feelsLike': {
        const result = Math.round(feelsLike);
        return result > 0 ? `+${result}` : result;
      }
      case 'description': {
        const getFirstLetter = description.slice(0, 1).toUpperCase();
        const restDescription = description.slice(1);
        const result = `${getFirstLetter}${restDescription}`;
        return result;
      }
      case 'today-date': {
        return actualDate;
      }
      default:
        return null;
    }
  };

  const handleWeatherIcon = (type) => {
    if (!weatherData.id || !weatherData.weather) {
      return '';
    }
    const [weatherInfo] = weatherData.weather;
    const { icon, description } = weatherInfo;
    const weatherIconLink = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    switch (type) {
      case 'image-icon':
        return weatherIconLink;
      case 'image-description':
        return description;
      case 'image-background':
        return clouds;
      default:
        return null;
    }
  };

  return (
    <section className="sidebar-container" aria-label="Сайдбар">
      <div className="sidebar-buttons">
        <button
          onClick={() => handleSearchSidebar()}
          type="button"
          className="sidebar-button"
        >
          Поиск города
        </button>
        <button
          onClick={() => handleNightMode()}
          type="button"
          className="sidebar-night-mode-button"
        >
          <span className="night-mode-circle">
            <img
              src={nightModeIcon}
              className="night-mode-icon"
              alt="Тёмная тема"
            />
          </span>
        </button>
      </div>
      <div className="sidebar-weather-icons">
        {isLoading || !forecastData || !weatherData.weather ? <LoadingAnimation /> : (
          <>
            <img
              src={handleWeatherIcon('image-background')}
              className="weather-background"
              alt={handleWeatherIcon('image-description')}
            />
            <img src={handleWeatherIcon('image-icon')} className="small-weather-icon" alt={handleWeatherIcon('image-description')} />
          </>
        )}
      </div>
      {isLoading || !forecastData.weekly ? <LoadingAnimation /> : (
        <div className="sidebar-content">
          <div className="sidebar-temperature">
            <span className="temperature-number">
              {handleSidebarContent('temperature')}
              {' '}
            </span>
            <sup className="temperature-unit">°C</sup>
          </div>
          <div className="sidebar-weather">{handleSidebarContent('description')}</div>
          <div className="sidebar-weather-description">{`Ощущается как ${handleSidebarContent('feelsLike')} °C`}</div>
          <div
            className="sidebar-today-info"
          >
            <span className="sidebar-today">Сегодня</span>
            <time className="sidebar-today-date">
              {handleSidebarContent('today-date')}
            </time>
          </div>
          <div className="sidebar-map-icon-container">
            <img src={mapIcon} className="map-icon" alt="Местоположение" />
            <div
              className={`sidebar-location ${
                locationName.length > 19 ? 'sidebar-long-location' : ''
              }`}
            >
              {locationName}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SidebarInfo;
