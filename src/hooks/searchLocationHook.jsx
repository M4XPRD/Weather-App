import { useContext } from 'react';
import SearchLocationContext from '../contexts/SearchLocationContext';

const useSearchLocation = () => useContext(SearchLocationContext);

export default useSearchLocation;
