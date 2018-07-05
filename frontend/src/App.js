import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'tachyons';

import './App.css';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Logo} />
      <Route path="/sign_in" component={SignIn} />
    </div>
  </Router>
);

export default App;
