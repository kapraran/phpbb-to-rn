export const FETCH_TOPICS_START = 'FETCH_TOPICS_START';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';

interface FetchTopicsStartAction {
  type: typeof FETCH_TOPICS_START;
}

interface FetchTopicsSuccessAction {
  type: typeof FETCH_TOPICS_SUCCESS;
}

interface FetchTopicsFailureAction {
  type: typeof FETCH_TOPICS_FAILURE;
}

export type TopicsActionTypes =
  | FetchTopicsStartAction
  | FetchTopicsSuccessAction
  | FetchTopicsFailureAction;
