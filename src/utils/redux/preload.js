import { matchPath } from 'react-router';
export function preload({ history, routes, location}, cb) {
  routes = typeof routes == 'function' ? routes(dispatch, getState) : routes;

  matchPath({ history, routes, location }, (error, redirect, props) => {

		const { components, location, params } = props;

    dispatch({ type: 'page.preload.start' });

    preload(components, { dispatch, getState, ...props }).then(() => {

      dispatch({ type: 'page.preload.finish' });
      cb();

    }).catch(error => {
      dispatch({ type: 'page.preload.error', error });
    })
  });
}

export function preloadReducer(state = {prevs: []}, action = {}) {
  switch (action.type) {
    case 'page.preload.start':
      return { ...state, pending: true, error: false };
    case 'page.preload.finish':
      return { ...state, pending: false, pended: true, error: false };
    case 'page.preload.error':
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

