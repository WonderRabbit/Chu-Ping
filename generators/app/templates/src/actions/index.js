export const FETCH_GREETING_REQUEST = 'FETCH_GREETING_REQUEST';
export const FETCH_GREETING_SUCCESS = 'FETCH_GREETING_SUCCESS';
export const FETCH_GREETING_FAILURE = 'FETCH_GREETING_FAILURE';

export function fetchGreetingRequest() {
  return {
    type: FETCH_GREETING_REQUEST
  };
}

export function fetchGreetingSuccess(message) {
  return {
    type: FETCH_GREETING_SUCCESS,
    payload: message
  };
}

export function fetchGreetingFailure(error) {
  return {
    type: FETCH_GREETING_FAILURE,
    error: error
  };
}

// generator-chuping:action-exports:start
// generator-chuping:action-exports:end
