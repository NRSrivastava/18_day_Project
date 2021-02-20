import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FullPage from './page.js';
import store from './store';
import {Posts,rfreshPost} from './api.js';


ReactDOM.render(
  <React.StrictMode>
    <FullPage />
  </React.StrictMode>,
  document.getElementById('root')
);


Posts();
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
