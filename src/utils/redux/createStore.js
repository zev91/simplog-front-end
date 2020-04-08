import { compose, createStore as _createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import { makeRootReducer } from './reducer';
import { updateLocation } from './location'

export const createStore = (reducer, initialState, middlewares = []) => {
  const middls = [ thunk, ...middlewares ];
  let composeEnhancers = compose;

  if (!__SERVER__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = _createStore(
    makeRootReducer(reducer),
    initialState,
    composeEnhancers(
      applyMiddleware(...middls),
    )
  );
  store.asyncReducers = {};

  if(browserHistory) {
    store.unsubscribeHistory = browserHistory.listen(updateLocation(store));
  };

  return store;
}
