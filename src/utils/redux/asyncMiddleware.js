import { types } from './reducer';

function noop() { };

export const asyncMiddleware = ({ http, onRequest = noop, onSuccess = noop, onError = noop }) => ({ dispatch, getState }) => next => async action => {
  let { promise, type, ...rests } = action;

  if (!promise) {
    return next(action);
  };

  const { REQUEST, SUCCESS, FAILURE } = types(type);
  const promised = promise(http, dispatch, getState);

  if (!promised || !promised.then) {
    dispatch({ type: SUCCESS, result: promised })
    onSuccess({ type: SUCCESS, result: promised, ...rests });
    return promised;
  };

  dispatch({ type: REQUEST });
  onRequest({ type: REQUEST, ...rests });

  try {
    const result = await promised
    dispatch({ type: SUCCESS, result });
    onSuccess({ type: SUCCESS, result: result, ...rests });
    return result;
  } catch (error) {
    onError({ type: FAILURE, error: error, ...rests });
    if (!error.response || error.response.status != 401) {
      console.error(error);
    }

    if (error.response) {
      dispatch({ type: FAILURE, error: error.response.data });
    } else {
      dispatch({ type: FAILURE, error: error });
    }
    throw error;
  }
}
