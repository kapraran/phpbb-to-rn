import { combineReducers } from 'redux';
// import topicsReducer from './topics/topics.reducer';
import settingsReducer, {
  State as SettingsState,
} from './settings/settings.reducer';

export type AppState = {
  settings: SettingsState;
};

export default combineReducers({
  settings: settingsReducer,
  // topics: topicsReducer,
});
