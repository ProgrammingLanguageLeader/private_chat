import React, { Component } from 'react';

import Main from '../Common/Main';
import SignUpForm from './SignUpForm';

class SignUp extends Component {
  render() {
    return (
      <Main>
        <SignUpForm />
      </Main>
    );
  }
}

export default SignUp;