import {
  FETCH_TOPICS_FAILURE,
  FETCH_TOPICS_START,
  FETCH_TOPICS_SUCCESS,
  TopicsActionTypes,
} from './topics.types';

interface StateType {
  isFetching: boolean;
  topics: string[];
}

const INITIAL_STATE = {
  isFetching: false,
  topics: [],
};

const topicsReducer = (
  state: StateType = INITIAL_STATE,
  action: TopicsActionTypes,
): StateType => {
  switch (action.type) {
    case FETCH_TOPICS_START:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case FETCH_TOPICS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default topicsReducer;
