import React from 'react';
import ReactDOM from 'react-dom';
import ASRIS from './components/asris';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import {Provider} from "react-redux";
import {persistor, store} from "./store/index";
import {PersistGate} from 'redux-persist/lib/integration/react';

// window.store = store;

const onBeforeLift = () => {
  store.dispatch({type: "CLEAR_ERROR"})
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
      <ASRIS/>
    </PersistGate>
</Provider>, document.getElementById('main')
);