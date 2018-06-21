import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './modules';
import { authStatus } from './actions';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk),
  composedEnhancers,
  initialState
);

persistStore(store);

window.addEventListener(
  'storage',
  function(event) {
    if (event.key === 'AUTHENTICATION_STATUS') {
      let auth = JSON.parse(event.newValue);
      store.dispatch(
        authStatus(auth.authenticated, auth.username, auth.avatar)
      );
    }
  },
  false
);

export default store;
