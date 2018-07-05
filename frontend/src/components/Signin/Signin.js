import React from 'react';
import { Link } from 'react-router-dom';

import TextBox from '../Common/TextBox';
import Button from '../Common/Button';
import Main from '../Common/Main';
import StyledForm from './StyledForm';
import StyledLabel from './StyledLabel';

const SignIn = () => (
  <Main>
    <StyledForm>
      <StyledLabel>
        SIGN IN
      </StyledLabel>
      <div className="pt1">
        <TextBox type="email" placeholder="Email" />
      </div>
      <div className="pt1">
        <TextBox type="password" placeholder="Password" />
      </div>
      <div className="pt1">
        <Link to="/">
          <Button type="submit">
            SIGN IN
          </Button>
        </Link>
      </div>
    </StyledForm>
  </Main>
);

export default SignIn;