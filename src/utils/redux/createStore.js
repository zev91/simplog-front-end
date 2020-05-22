import { compose, createStore as _createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { makeRootReducer } from './reducer';

export const createStore = (reducer, initialState, middlewares = []) => {
  const middls = [ thunk, ...middlewares ];
  let composeEnhancers = compose;
  
  if (typeof(window) !== 'undefined' && !__IS_PROD__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = _createStore(
    makeRootReducer(reducer),
    {},
    composeEnhancers(
      applyMiddleware(...middls),
    )
  );

  store.asyncReducers = {};
  return store;
}
