import React from 'react';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import reactDom from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';

const rootEL = document.getElementById('root');

function render() {
  reactDom.render(<App/>, rootEL);
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function() {
    setTimeout(render);
  })
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
