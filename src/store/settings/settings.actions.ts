import { SET_DARK_THEME } from './settings.types';

export const setDarkTheme = (enable: boolean) => {
  return {
    type: SET_DARK_THEME,
    payload: enable,
  };
};
