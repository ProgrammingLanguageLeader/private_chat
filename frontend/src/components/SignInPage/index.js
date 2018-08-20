import React, { Component } from 'react';

import Main from '../Common/Main';
import Header from '../Common/Header';
import NavBar from '../Common/NavBar';
import SignInForm from './SignInForm';

class SignIn extends Component {
  render() {
    return (
      <div>
        <Header>
          <NavBar></NavBar>
        </Header>
        <Main>
          <SignInForm />
        </Main>
      </div>
    );
  }
}

export default SignIn; 