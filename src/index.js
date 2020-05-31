import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor, sagaMiddleware } from './redux/store'
import './index.css'
import App from './App'
import { saveBeforeInstallPromptEvent } from './install'
import rootSaga from './redux/sagas/sagas'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

sagaMiddleware.run(rootSaga)

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/symbol/:symbol'}>
          <div>coming soon</div>
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent)
