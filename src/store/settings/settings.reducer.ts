import { SET_DARK_MODE } from './settings.types';

const INITIAL_STATE = {
  darkMode: false,
};

export type State = typeof INITIAL_STATE;

const settingsReducer = (
  state: State = INITIAL_STATE,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };

    default:
      return state;
  }
};

export default settingsReducer;
