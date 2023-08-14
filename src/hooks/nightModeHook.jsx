import { useContext } from 'react';
import NightModeContext from '../contexts/NightModeContext.jsx';

const useNightMode = () => useContext(NightModeContext);

export default useNightMode;
