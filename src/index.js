import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import Footer from './components/layout/Footer';
import Body from './components/layout/Body';


import axios from 'axios';
axios.defaults.baseURL = 'http://localhost/E-commerce/api/';

axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');


ReactDOM.render(
  <React.StrictMode>    
    <Body />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
