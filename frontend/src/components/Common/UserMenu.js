import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

import { authActions, usersInfoActions } from '../../actions';

const StyledMenu = styled.ul.attrs({
  className: 'white'
})`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
`;

const StyledMenuItem = styled.li`
  display: block;
  background: #123123;
`;

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.exitLinkClick = this.exitLinkClick.bind(this);
  }

  componentDidMount() {
    const { access } = this.props.auth;
    const userId = jwtDecode(access).user_id;
    this.props.dispatch(
      usersInfoActions.obtainUserInfo(userId)
    );
  }

  exitLinkClick(event) {
    event.preventDefault();
    this.props.dispatch(
      authActions.logout()
    );
  }

  render() {
    const { access } = this.props.auth;
    const userId = jwtDecode(access).user_id;
    return (
      <div className="white" onClick={(e) => {this.setState({ isVisible: !this.state.isVisible })}}>
        {(this.props.usersInfo.fetching || !this.props.usersInfo.users[userId]) ? (
          "Loading..."
        ) : (
          this.props.usersInfo.users[userId].username
        )}
        <StyledMenu isVisible={this.state.isVisible}>
          <StyledMenuItem>
            <Link to="#" onClick={this.exitLinkClick}>Exit</Link>
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { auth, usersInfo } = state;
  return {
    auth, usersInfo
  };
};

export default connect(mapStateToProps)(UserMenu);