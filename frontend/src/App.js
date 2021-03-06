import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import 'tachyons';

import './App.css';
import { history } from './helpers';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import AboutPage from './components/AboutPage';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/sign_in" component={SignInPage} />
          <Route path="/sign_up" component={SignUpPage} />
          <Route path="/about" component={AboutPage} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(App);
