import React from 'react';
import Main from './components/Main';
import WeatherProvider from './contexts/WeatherProvider';
import NightModeProvider from './contexts/NightModeProvider';
import SearchLocationProvider from './contexts/SearchLocationProvider';

const App = () => (
  <WeatherProvider>
    <NightModeProvider>
      <SearchLocationProvider>
        <Main />
      </SearchLocationProvider>
    </NightModeProvider>
  </WeatherProvider>
);

export default App;
