import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import UserMenu from './UserMenu';
import { authActions } from '../../actions';

const StyledNav = styled.nav.attrs({
  className: 'b flex justify-center bb b--white-10 bg-black pa3 items-center'
})``;

const NavBarLink = styled(Link).attrs({
  className: 'f6 link white dim w-auto pa2 mr1 mr3-ns'
})``;

const CommonItemsContainer = styled.div.attrs({
  className: 'flex justify-end w-35'
})``;

const BlankSpace = styled.div.attrs({
  className: 'flex w-20'
})``;

const UserManagementItemsContainer = styled.div.attrs({
  className: 'flex justify-start w-35'
})``;

class NavBar extends Component {
  constructor(props) {
    super(props);
    
    this.exitLinkClick = this.exitLinkClick.bind(this);
  }

  exitLinkClick(event) {
    event.preventDefault();
    this.props.dispatch(
      authActions.logout()
    );
  }

  render() {
    return (
      <StyledNav>
        <CommonItemsContainer>
          <NavBarLink to="/">Home</NavBarLink>
          <NavBarLink to="/about">About</NavBarLink>
        </CommonItemsContainer>
        <BlankSpace></BlankSpace>
        <UserManagementItemsContainer>
          {!this.props.auth.access ? [
            <NavBarLink key="sign_in" to="/sign_in">Sign In</NavBarLink>,
            <NavBarLink key="sign_up" to="/sign_up">Sign Up</NavBarLink>
          ] : (
            <UserMenu></UserMenu>
          )}
        </UserManagementItemsContainer>
      </StyledNav>
    );
  }
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    auth
  };
};

export default connect(mapStateToProps)(NavBar);