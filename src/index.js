import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './app/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App store={store} />
);