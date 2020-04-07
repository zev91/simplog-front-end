import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

let composeEnhancers = compose;

if (!__SERVER__) {
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__     
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension;
  }
}

export default (defaultState = {}) => {
  return createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk)));
}


