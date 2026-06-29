export const <%= constantName %>_REQUEST = '<%= constantName %>_REQUEST';
export const <%= constantName %>_SUCCESS = '<%= constantName %>_SUCCESS';
export const <%= constantName %>_FAILURE = '<%= constantName %>_FAILURE';

export function <%= camelName %>Request(payload) {
  return {
    type: <%= constantName %>_REQUEST,
    payload: payload
  };
}

export function <%= camelName %>Success(payload) {
  return {
    type: <%= constantName %>_SUCCESS,
    payload: payload
  };
}

export function <%= camelName %>Failure(error) {
  return {
    type: <%= constantName %>_FAILURE,
    error: error
  };
}
