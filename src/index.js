import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import './index.scss';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'; // for persist
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import rootSaga from './redux/sagas';
// import * as serviceWorker from './serviceWorker';
// import './serviceWorker';
import 'raf/polyfill';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

import App from './App';
import auth from './redux/reducers/auth';
import user from './redux/reducers/user';
import analyst from './redux/reducers/analyst';

const history = createBrowserHistory();
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();


// const reducers = (state, action) => Creducers(state, action);

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const reducers = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  } else if (action.type === 'LOGOUT_FAILURE') {
    state = undefined;
  }

  return Creducers(state, action);
};
export default reducers;
// to get the actual state before reconciling the reducer
const migrations = {
  1.37: state => ({
    ...state,
    device: undefined
  })
};
// middlewares.push(logger);
middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));
const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  blacklist: ['view', 'router', "analyst", "user"],
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: true }),
}; // for persist

const analystPersistConfig = {
  key: 'analyst',
  storage,
  blacklist: ['tradeList']
}

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['feed']
}

const Creducers = combineReducers({
  auth,
  user: persistReducer(userPersistConfig, user),
  analyst: persistReducer(analystPersistConfig, analyst),
  router: connectRouter(history)
});

const persistedReducer = persistReducer(persistConfig, reducers); // for persist
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(persistedReducer),
  {},
  composeEnhancers(applyMiddleware(...middlewares))
); // for persist
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store); // for persist

if (process.env.NODE_ENV !== 'development') {
  console.log = () => { };
  console.error = () => { };
  console.warn = () => { };
  console.exception = () => { };
  console.clear();
}

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App history={history} />
      </PersistGate>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);
// init();
// serviceWorker.register();

// initializeFirebase(); 

// function generateVAPIDKeys() {
//   const vapidKeys = webpush.generateVAPIDKeys();

//   return {
//     publicKey: vapidKeys.publicKey,
//     privateKey: vapidKeys.privateKey,
//   };
// }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceWorker.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
        subscribeUser();

      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', JSON.stringify(sub));

        localStorage.setItem('deviceToken', JSON.stringify(sub));
        
        // window.prompt("Copy to clipboard: ", JSON.stringify(sub));
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });

  navigator.serviceWorker.addEventListener('message', function(event) {
    console.log("::::::::::INSIDE EVENT LISTNER MESSAGE::::::::::");
    console.log(event.data);
    let message = JSON.parse(event.data).message

    var existingNotifications = JSON.parse(localStorage.getItem("notifications"));
    if(existingNotifications == null) existingNotifications = [];
    localStorage.setItem("notification", JSON.stringify(message));
    // Save all notifications back to local storage
    existingNotifications.unshift(message);
    localStorage.setItem("notifications", JSON.stringify(existingNotifications));  
  });

}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

    const convertedVapidKey = urlBase64ToUint8Array("BC4MNAroGWNB_-ZGCWmimXfFpUOVkxmzdYQno_gUFiHCzg_1cX9NPnnkeZsJ6eW0mEfEIkS3gd_p8weXGuPjc1k")

    function urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - base64String.length % 4) % 4)
      // eslint-disable-next-line
      const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }

      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
        
        localStorage.setItem('deviceToken', JSON.stringify(sub));

        // window.prompt("Copy to clipboard: ", JSON.stringify(sub));
        
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}
