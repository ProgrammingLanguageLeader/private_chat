import React, { Component } from 'react';

import Main from '../Common/Main';
import Header from '../Common/Header';
import NavBar from '../Common/NavBar';
import SignUpForm from './SignUpForm';

class SignUp extends Component {
  render() {
    return (
      <div>
        <Header>
          <NavBar></NavBar>
        </Header>
        <Main>
          <SignUpForm />
        </Main>
      </div>
    );
  }
}

export default SignUp;