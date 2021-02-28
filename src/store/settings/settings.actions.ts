import { SET_DARK_MODE } from './settings.types';

export const setDarkMode = (enabled: boolean) => ({
  type: SET_DARK_MODE,
  payload: enabled,
});
