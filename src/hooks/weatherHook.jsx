import { useContext } from 'react';
import weatherContext from '../contexts/WeatherContext.jsx';

const useWeather = () => useContext(weatherContext);

export default useWeather;
