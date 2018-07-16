import React, { Component } from 'react';

import StyledTextBox from '../Common/StyledTextBox';
import Button from '../Common/Button';
import StyledForm from '../Common/StyledForm';
import StyledLabel from '../Common/StyledLabel';
import Group from '../Common/Group';

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
    console.log(this.state);
  }

  render() {
    return (
      <StyledForm onSubmit={ this.onSubmit }>
        <StyledLabel>
          SIGN UP
        </StyledLabel>
        <Group>
          <StyledTextBox 
            name="username" 
            type="text" 
            placeholder="Username" 
            onChange={ this.onChange }
          />
          <StyledTextBox 
            name="email" 
            type="email" 
            placeholder="Email" 
            onChange={ this.onChange }
          />
          <StyledTextBox 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={ this.onChange }
          />
          <StyledTextBox 
            name="password_confirmation" 
            type="password" 
            placeholder="Password confirmation"
            onChange={ this.onChange }
          />
        </Group>
        <Group>
          <StyledTextBox 
            name="first_name" 
            type="text" 
            placeholder="First name"
            onChange={ this.onChange }
          />
          <StyledTextBox 
            name="last_name"
            type="text" 
            placeholder="Last name" 
            onChange={ this.onChange }
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

export default SignUpForm;