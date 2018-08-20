import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav.attrs({
  className: 'flex bb b--white-10 bg-black pa2'
})``;

const NavBarLink = styled(Link).attrs({
  className: 'f6 link dib white dim mr3 mr4-ns'
})``;

const NavBarItemsContainer = styled.div.attrs({
  className: "pa3 pl6 flex items-center"
})`
  /* width: 100%;*/
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledNav>
        <NavBarItemsContainer>
          <NavBarLink to="/">Home</NavBarLink>
          <NavBarLink to="/sign_in">Sign In</NavBarLink>
          <NavBarLink to="/sign_up">Sign Up</NavBarLink>
          <NavBarLink to="/about">About</NavBarLink>
        </NavBarItemsContainer>
      </StyledNav>
    );
  }
};

export default NavBar;