import React, { Component } from 'react';
import styled from 'styled-components';

import Main from '../Common/Main';
import Header from '../Common/Header';
import NavBar from '../Common/NavBar';

const StyledHeader = styled.h1.attrs({
  className: 'ma4 white'
})``;

class About extends Component {
  render() {
    return (
      <div>
        <Header>
          <NavBar></NavBar>
        </Header>
        <Main>
          <StyledHeader>
            The information about the project will be here
          </StyledHeader>
        </Main>
      </div>
    );
  }
}

export default About; 