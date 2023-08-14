import React, { useEffect, useRef, useState } from 'react';
import cross from '../../assets/sidebar-search/cross.svg';
import useWeather from '../../hooks/weatherHook';
import useSearchLocation from '../../hooks/searchLocationHook';

const SidebarSearch = () => {
  const weather = useWeather();
  const searchLocation = useSearchLocation();
  const inputFocus = useRef();

  const [locationSearch, setLocationSearch] = useState('');
  const [inputError, setInputError] = useState('');

  const errors = {
    notFound: 'Упс! Город не найден, попробуйте другой',
    parsingError: 'Упс! Ошибка сервера, попробуйте ещё раз',
    wrongLocation: 'Упс! Выберите другую локацию',
    unknownError: 'Упс! Неизвестная ошибка, попробуйте ещё раз',
  };

  const exceptedLocations = ['state', 'city', 'town', 'village', 'hamlet', 'province', 'county', 'municipality'];

  const {
    isLoading,
    setIsLoading,
  } = weather;

  const {
    toggleSearchSidebar,
    isSearchActive,
    handleSearchHistory,
    handleCurrentLocation,
    searchHistory,
    currentLocation,

  } = searchLocation;

  useEffect(() => {
    inputFocus.current.focus();
  });

  const handleCloseSearchSidebar = () => {
    toggleSearchSidebar();
  };

  const handleCitySearch = (e) => setLocationSearch(e.target.value);

  const isCyrillicWord = (word) => {
    const cyrillicRegex = /^[а-яА-ЯёЁ-\s]+$/;
    return cyrillicRegex.test(word);
  };

  const validationLocation = (locationInfo) => {
    if (!locationInfo) {
      throw new Error('notFound');
    }
    const locationType = locationInfo.addresstype;
    const locationName = locationInfo.name;
    console.log(locationType);
    if (!exceptedLocations.includes(locationType) || !isCyrillicWord(locationName)) {
      throw new Error('wrongLocation');
    }
    const locationLatitude = locationInfo.lat;
    const locationLongitude = locationInfo.lon;
    const locationData = {
      locationName: locationType === 'village' ? `деревня ${locationInfo.name}` : locationInfo.name,
      lat: locationLatitude,
      lon: locationLongitude,
    };
    if (locationName) {
      handleSearchHistory(locationData);
      handleCurrentLocation(locationData);
      handleCloseSearchSidebar();
    } else {
      throw new Error('unknownError');
    }
  };

  const handleFindCity = async (e) => {
    e.preventDefault();
    setInputError(null);
    setIsLoading(true);
    try {
      e.preventDefault();
      const parseLocationLink = `https://nominatim.openstreetmap.org/search.php?q=${locationSearch}&format=json&addressdetails=1&limit=1&accept-language=ru`;
      const parseLocation = await fetch(parseLocationLink);
      const data = await parseLocation.json();
      const [locationInfo] = data;
      validationLocation(locationInfo);
    } catch (error) {
      switch (error.message) {
        case 'wrongLocation':
          setInputError('wrongLocation');
          break;
        case 'notFound':
          setInputError('notFound');
          break;
        case 'unknownError':
          setInputError('unknownError');
          break;
        default: {
          setInputError('parsingError');
          break;
        }
      }
    }
    setIsLoading(false);
    setLocationSearch('');
  };

  const handleNewLocation = (e) => {
    const newCurrentLocation = e.target.textContent;
    handleCurrentLocation('clicked', newCurrentLocation);
    handleCloseSearchSidebar();
  };

  return (
    <section className={`search-sidebar ${isSearchActive ? 'active' : ''}`} aria-label="Поиск города">
      <div className="search-sidebar-container">
        <button
          onClick={() => handleCloseSearchSidebar()}
          type="button"
          className="search-cross-container"
        >
          <img
            src={cross}
            className="search-sidebar-cross"
            alt="Закрыть окно поиска"
          />
        </button>
        <div
          className="search-sidebar-error"
          style={{
            visibility: inputError ? 'visible' : 'hidden',
            opacity: inputError ? 1 : 0,
          }}
        >
          {inputError ? errors[inputError] : '\u00A0'}
        </div>
        <form
          onSubmit={(e) => handleFindCity(e)}
          className="search-sidebar-content"
        >
          <label htmlFor="search-input">
            <input
              onChange={handleCitySearch}
              ref={inputFocus}
              id="search-input"
              className="search-input"
              type="search"
              placeholder={currentLocation.locationName}
              value={locationSearch}
              autoComplete="off"
              disabled={isLoading}
            />
          </label>
          <button
            type="submit"
            className="find-button"
            disabled={isLoading || locationSearch.length < 1}
          >
            Найти
          </button>
        </form>
        {searchHistory.length > 0 && (
          <div className="search-sidebar-history">
            {searchHistory.map(({ locationName }) => (
              <button
                type="button"
                key={`city_${locationName}`}
                className={`history-location ${
                  locationName === currentLocation.locationName
                    ? 'active-button'
                    : ''
                }`}
                onClick={(e) => handleNewLocation(e)}
              >
                {locationName}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SidebarSearch;
