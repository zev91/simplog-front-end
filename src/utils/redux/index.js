import * as createStore from './createStore';
import * as reducer from './reducer';
import * as asyncMiddleware from './asyncMiddleware';
import * as preload from './preload';

export default {
  ...createStore,
  ...reducer,
  ...asyncMiddleware,
  ...preload
}

