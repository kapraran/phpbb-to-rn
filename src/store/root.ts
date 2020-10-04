import { combineReducers } from 'redux';
import topicsReducer from './topics/topics.reducer';

export default combineReducers({
  topics: topicsReducer,
});
