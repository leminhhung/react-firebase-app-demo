import React from 'react';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import reactDom from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { loadEvents } from './features/events/eventActions';

const rootEL = document.getElementById('root');

const store = configureStore();

store.dispatch(loadEvents());

function render() {
  reactDom.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <App/>
      </BrowserRouter>
    </Provider>,
    rootEL);
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
