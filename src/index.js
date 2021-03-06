import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/quiz' component={Quiz} />
        </div>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
