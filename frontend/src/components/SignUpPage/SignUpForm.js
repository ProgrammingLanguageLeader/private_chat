import React, { Component } from 'react';
import { connect } from 'react-redux';

import StyledTextBox from '../Common/StyledTextBox';
import Button from '../Common/Button';
import StyledForm from '../Common/StyledForm';
import StyledLabel from '../Common/StyledLabel';
import Group from '../Common/Group';
import FormErrors from '../Common/FormErrors';
import Alert from '../Common/Alert';
import { registrationActions } from '../../actions';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: ''
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
    const { username, email, password, passwordConfirmation, firstName, lastName } = this.state;
    this.props.dispatch(
      registrationActions.register(username, email, password, passwordConfirmation, firstName, lastName)
    );
  }

  render() {
    return (
      <StyledForm onSubmit={this.onSubmit}>
        <StyledLabel>SIGN UP</StyledLabel>
        {(this.props.registration.errors) && (
          <Group>
            <FormErrors formErrors={this.props.registration.errors}></FormErrors>
          </Group>
        )}
        {(this.props.registration.success) && (
          <Group>
            <Alert>The account has been successfully registered</Alert>
          </Group>
        )}
        <Group>
          <StyledTextBox 
            name="username" 
            type="text" 
            placeholder="Username" 
            onChange={this.onChange}
          />
          <StyledTextBox 
            name="email" 
            type="email" 
            placeholder="Email" 
            onChange={this.onChange}
          />
          <StyledTextBox 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={this.onChange}
          />
          <StyledTextBox 
            name="passwordConfirmation" 
            type="password" 
            placeholder="Password confirmation"
            onChange={this.onChange}
          />
        </Group>
        <Group>
          <StyledTextBox 
            name="firstName" 
            type="text" 
            placeholder="First name"
            onChange={this.onChange}
          />
          <StyledTextBox 
            name="lastName"
            type="text" 
            placeholder="Last name" 
            onChange={this.onChange}
          />
        </Group>
        <Group>
          <Button type="submit">
            SIGN UP
          </Button>
        </Group>
      </StyledForm>
    );
  }
}

const mapStateToProps = (state) => {
  const { registration } = state;
  return {
    registration
  };
};

export default connect(mapStateToProps)(SignUpForm);