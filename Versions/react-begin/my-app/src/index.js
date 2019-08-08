import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import './App.css';

const name = 'Иван-Царевич';
const element = <h1>Здравствуй, {name}!</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);



serviceWorker.unregister();
