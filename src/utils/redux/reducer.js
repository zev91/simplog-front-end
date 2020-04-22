import { combineReducers } from 'redux';
import * as loca from './location';

// import { set, has } from 'lodash';
const set = require('lodash.set');
const has = require('lodash.has');
const combine = combineReducers;

export let initReducers = {
  location: loca.locationReducer
};

export const makeRootReducer = (reducers = {}) => {
  initReducers = { ...initReducers, ...reducers };

  return combineReducers({
    ...initReducers
  });
};

export const combineReducersRecurse = function (reducers) {
  if (typeof reducers === 'function') {
    return reducers
  }

  if (typeof reducers === 'object') {
    let combinedReducers = {}
    for (let key of Object.keys(reducers)) {
      combinedReducers[key] = combineReducersRecurse(reducers[key])
    }
    return combine(combinedReducers)
  }

  throw new Error({
    message: 'Invalid item in reducer tree',
    item: reducers
  })
}

export let InjectReducerManager = {
  store: {},
  loadReducer: [],
  with: function (store) {
    this.injectReducer = this.create(store)
    this.store = store;
    this.setLoadReducer();
  },
  create: (store) => ({ key, reducer, ...reducers }) => {
    if (has(store.asyncReducers, key)) return
    if (!key) {
      Object.keys(reducers).forEach(key => {
        set(store.asyncReducers, key, reducers[key])
      })
    } else {
      set(store.asyncReducers, key, reducer)
    }
    store.replaceReducer(combineReducersRecurse({ ...initReducers, ...store.asyncReducers }))
  },
  injectReducer: function ({ key, reducer, ...reducers }) {
    this.loadReducer.push({ key, reducer, ...reducers });
  },
  setLoadReducer: function () {
    this.loadReducer.forEach(reducer => {
      this.injectReducer(reducer);
    });
  }
}

export const injectReducer = ({ key, reducer, ...reducers }) => {
  InjectReducerManager.injectReducer({ key, reducer, ...reducers })
}

export const createReducer = () => {
  const reducer = (initState = {}) => (state = initState, action = {}) => {
    const handler = reducer[action.type]
    if (!handler) { return state }

    return handler(state, action.result || action.error)
  }

  return reducer;
}


export const action = ({ type, action, handler }, reducerCreator) => {
  const { REQUEST, SUCCESS, FAILURE } = types(type)

  reducerCreator[REQUEST] = (state, result) => ({
    ...state,
    [`${type}.pending`]: true,
    [`${type}.error`]: undefined
  })

  reducerCreator[SUCCESS] = (state, result) => ({
    ...state,
    ...handler(state, result),
    [`${type}.pending`]: false,
    [`${type}.error`]: undefined
  })

  reducerCreator[FAILURE] = (state, error) => ({
    ...state,
    [`${type}.pending`]: false,
    [`${type}.error`]: error
  })

  return (...args) => ({
    type,
    promise: (http, dispatch, getState) => action.apply(this, args.concat([http, dispatch, getState]))
  })
}

export const types = (type) => ({
  REQUEST: `async.action.request.${type}`,
  SUCCESS: `async.action.success.${type}`,
  FAILURE: `async.action.failure.${type}`
})
