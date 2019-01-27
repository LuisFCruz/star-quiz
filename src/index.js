import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Quiz from './pages/Quiz/Quiz'
import Home from './pages/Home/Home'
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/quiz' component={Quiz} />
      </div>
    </BrowserRouter>
  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
