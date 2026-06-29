import { takeLatest } from 'redux-saga/effects';

export function* <%= camelName %>Worker(action) {
  yield action;
}

export default function* <%= camelName %>Saga() {
  yield takeLatest('<%= constantName %>_REQUEST', <%= camelName %>Worker);
}
