import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_GREETING_REQUEST,
  fetchGreetingSuccess,
  fetchGreetingFailure
} from '../actions';
// generator-chuping:saga-imports:start
// generator-chuping:saga-imports:end

export function fetchGreeting() {
  return Promise.resolve('Redux Saga handled the action.');
}

export function* fetchGreetingWorker() {
  try {
    const message = yield call(fetchGreeting);
    yield put(fetchGreetingSuccess(message));
  } catch (error) {
    yield put(fetchGreetingFailure(error.message));
  }
}

export function* watchGreeting() {
  yield takeLatest(FETCH_GREETING_REQUEST, fetchGreetingWorker);
}

export default function* rootSaga() {
  yield all([
    watchGreeting(),
// generator-chuping:saga-list:start
// generator-chuping:saga-list:end
  ]);
}
