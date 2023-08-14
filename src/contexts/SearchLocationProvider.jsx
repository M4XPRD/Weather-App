import {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import SearchLocationContext from './SearchLocationContext';

const SearchLocationProvider = ({ children }) => {
  const localStorageSearchHistory = localStorage.getItem('searchHistory');
  const localStorageCurrenLocation = localStorage.getItem('currentLocation');
  const [isSearchActive, setIsSearchActive] = useState('');
  const [searchHistory, setSearchHistory] = useState(localStorageSearchHistory
    ? JSON.parse(localStorageSearchHistory) : []);

  const [currentLocation, setCurrentLocation] = useState(JSON.parse(localStorageCurrenLocation)
    ? JSON.parse(localStorageCurrenLocation) : {
      locationName: 'Москва',
      lat: '55.625578',
      lon: '37.6063916',
    });

  const toggleSearchSidebar = useCallback(() => {
    setIsSearchActive((prevIsSearchActive) => (prevIsSearchActive === '' ? 'active' : ''));
  }, []);

  const handleSearchHistory = useCallback((newLocationData) => {
    setSearchHistory((prevHistory) => {
      const existingCityIndex = prevHistory.findIndex(
        ({ locationName }) => locationName === newLocationData.locationName,
      );
      if (existingCityIndex !== -1) {
        const newHistory = prevHistory.filter(
          ({ locationName }) => locationName !== newLocationData.locationName,
        );
        return [...newHistory, newLocationData];
      }
      return [...prevHistory, newLocationData];
    });
  }, []);

  useEffect(() => {
    if (searchHistory.length > 5) {
      setSearchHistory((prevHistory) => prevHistory.slice(1));
    }
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('currentLocation', JSON.stringify(currentLocation));
  }, [currentLocation]);

  const handleCurrentLocation = useCallback(
    (newCurrentLocation, newLocationName) => {
      if (newLocationName && newCurrentLocation === 'clicked') {
        const currentLocationData = searchHistory.find(
          ({ locationName }) => locationName === newLocationName,
        );
        if (currentLocationData) {
          setCurrentLocation(currentLocationData);
        }
      } else {
        setCurrentLocation(newCurrentLocation);
      }
    },
    [searchHistory],
  );

  const providedData = useMemo(
    () => ({
      toggleSearchSidebar,
      isSearchActive,
      handleSearchHistory,
      searchHistory,
      handleCurrentLocation,
      currentLocation,
    }),
    [
      toggleSearchSidebar,
      isSearchActive,
      handleSearchHistory,
      searchHistory,
      handleCurrentLocation,
      currentLocation,
    ],
  );

  return (
    <SearchLocationContext.Provider value={providedData}>
      {children}
    </SearchLocationContext.Provider>
  );
};

export default SearchLocationProvider;
