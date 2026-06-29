export const <%= constantName %>_INITIAL_STATE = {
  isLoading: false,
  items: [],
  error: null
};

export default function <%= camelName %>Reducer(state, action) {
  if (state === undefined) {
    return <%= constantName %>_INITIAL_STATE;
  }

  switch (action.type) {
    default:
      return state;
  }
}
