import React, { Component } from 'react';

import Main from '../Common/Main';
import SignInForm from './SignInForm';

class SignIn extends Component {
  render() {
    return (
      <Main>
        <SignInForm />
      </Main>
    );
  }
}

export default SignIn; 