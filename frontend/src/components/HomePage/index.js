import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Main from '../Common/Main';
import Header from '../Common/Header';
import NavBar from '../Common/NavBar';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledHeader = styled.h1.attrs({
  className: 'ma4 white'
})``;

const HomePage = () => {
  return (
    <div>
      <Header>
        <NavBar></NavBar>
      </Header>
      <Main>
        <StyledLink to="/sign_in">
          <StyledHeader>
            Animated Logo. Click On Me! (this is temporary)
          </StyledHeader>
        </StyledLink>
      </Main>
    </div>
  );
}

export default HomePage;