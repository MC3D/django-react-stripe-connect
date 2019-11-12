import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {Elements, StripeProvider} from 'react-stripe-elements';

import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Authorize from './components/Authorize';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <StripeProvider apiKey="pk_test_4qASinaI2e8itlirCeBSidZx00NZ0Z9j8v">
    <Router>
        <Switch>
          <Route path='/authorize/' component={Authorize} />
          <Route exact path='/courses/' component={CourseList} />
          <Elements>
            <Route path='/courses/:slug/' component={CourseDetail} />
          </Elements>
      </Switch>
    </Router>
  </StripeProvider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
