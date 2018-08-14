import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'tachyons';

import './App.css';
import Logo from './components/Logo';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Logo} />
      <Route path="/sign_in" component={SignIn} />
      <Route path="/sign_up" component={SignUp} />
    </div>
  </Router>
);

export default connect(
  state => ({
    propName: state
  }),
  dispatch => ({})
)(App);
