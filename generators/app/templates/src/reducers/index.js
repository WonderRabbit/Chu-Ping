import { combineReducers } from 'redux';
import {
  FETCH_GREETING_REQUEST,
  FETCH_GREETING_SUCCESS,
  FETCH_GREETING_FAILURE
} from '../actions';
// generator-chuping:reducer-imports:start
// generator-chuping:reducer-imports:end

export const APP_INITIAL_STATE = {
  isLoading: false,
  message: 'Ready for Redux Saga.',
  error: null
};

export function app(state, action) {
  if (state === undefined) {
    return APP_INITIAL_STATE;
  }

  switch (action.type) {
    case FETCH_GREETING_REQUEST:
      return {
        isLoading: true,
        message: state.message,
        error: null
      };
    case FETCH_GREETING_SUCCESS:
      return {
        isLoading: false,
        message: action.payload,
        error: null
      };
    case FETCH_GREETING_FAILURE:
      return {
        isLoading: false,
        message: state.message,
        error: action.error
      };
    default:
      return state;
  }
}

export default combineReducers({
  app: app,
// generator-chuping:reducer-map:start
// generator-chuping:reducer-map:end
});
