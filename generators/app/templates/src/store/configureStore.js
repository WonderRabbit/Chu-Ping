import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware.apply(null, middleware))
  );

  store.runSaga = sagaMiddleware.run;

  return store;
}
