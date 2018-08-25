import React, { Component } from 'react';
import { connect } from 'react-redux';

import StyledTextBox from '../Common/StyledTextBox';
import Button from '../Common/Button';
import StyledForm from '../Common/StyledForm';
import StyledLabel from '../Common/StyledLabel';
import Group from '../Common/Group';
import { authActions } from '../../actions';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      this.props.dispatch(authActions.login(username, password));
    }
  }

  render() {
    return (
      <StyledForm onSubmit={ this.onSubmit }>
        <StyledLabel>
          SIGN IN
        </StyledLabel>
        <Group>
          <StyledTextBox 
            name="username" 
            type="text" 
            placeholder="Username or email"
            autoComplete="username"
            onChange={ this.onChange }
          />
          <StyledTextBox 
            name="password" 
            type="password" 
            placeholder="Password"
            autoComplete="current-password"
            onChange={ this.onChange }
          />
        </Group>
        <Group>
          <Button type="submit">
            SIGN IN
          </Button>
        </Group>
      </StyledForm>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth
  };
};

export default connect(mapStateToProps)(SignInForm);