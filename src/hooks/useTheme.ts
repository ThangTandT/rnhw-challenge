import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {darkTheme, lightTheme} from '~/theme';
import {AppStateType} from '~/types';

export const useTheme = () => {
  const theme = useSelector((state: AppStateType) => state.app.theme);

  const currentTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  return {
    currentTheme,
  };
};
