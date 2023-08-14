import {
  useState, useMemo, useCallback,
} from 'react';
import NightModeContext from './NightModeContext';

const NightModeProvider = ({ children }) => {
  const localStorageNightMode = localStorage.getItem('nightMode');
  const [isNightModeOn, setIsNightModeOn] = useState(localStorageNightMode ?? '');

  const toggleNightMode = useCallback(() => {
    if (isNightModeOn === '') {
      setIsNightModeOn('night-on');
      localStorage.setItem('nightMode', 'night-on');
    } else {
      setIsNightModeOn('');
      localStorage.removeItem('nightMode');
    }
  }, [isNightModeOn]);

  const providedData = useMemo(() => ({
    toggleNightMode,
    isNightModeOn,
  }), [toggleNightMode,
    isNightModeOn,
  ]);

  return (
    <NightModeContext.Provider value={providedData}>
      {children}
    </NightModeContext.Provider>
  );
};

export default NightModeProvider;
