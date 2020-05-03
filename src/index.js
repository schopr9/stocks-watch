import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, sagaMiddleware } from './redux/store'
import './index.css'
import App from './App'
import { saveBeforeInstallPromptEvent } from './install'
import rootSaga from './redux/sagas/sagas'
import * as serviceWorker from './serviceWorker'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>	  
      <App/>
    </PersistGate>	
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent)
