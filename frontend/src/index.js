import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const config = {
  headers: {
    accept: 'application/json',
  },
  data: {},
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
