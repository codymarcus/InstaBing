import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import App from './components/app';
import Home from './components/home';
import RequireAuth from './components/auth/require_auth';
import Search from './components/search';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import User from './components/user';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // Decode the JWT
  const decodedToken = jwtDecode(token);
  // we need to update application state
  store.dispatch({
    type: AUTH_USER,
    id: decodedToken.sub,
    username: decodedToken.name
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="search" component={RequireAuth(Search)} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="users/:id" component={User} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
