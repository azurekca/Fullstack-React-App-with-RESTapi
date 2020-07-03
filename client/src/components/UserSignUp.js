import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  componentDidMount() {
    document.title = 'Courses | Sign Up';
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <UserForm 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName}
                  aria-required="true"
                  onChange={this.change} 
                  placeholder="First name"
                  autoComplete="given-name"
                  autoFocus />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName}
                  aria-required="true"
                  onChange={this.change} 
                  placeholder="Last name"
                  autoComplete="family-name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="emailAddress"
                  value={emailAddress}
                  aria-required="true"
                  onChange={this.change} 
                  placeholder="Email"
                  autoComplete="username" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password}
                  aria-required="true"
                  onChange={this.change} 
                  placeholder="Password"
                  autoComplete="new-password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    // this gives us access to the Data methods for talking to the api
    const { context } = this.props;

    // this is the info for the new user
    const {
      firstName,
      lastName,
      emailAddress,
      password
    } = this.state;

    // create a new user object based on the properties we got from state
    const user = { firstName, lastName, emailAddress, password };

    context.data.createUser(user)
      .then(data => {
        if (data.errors) {
          // validation errors
          this.setState({ errors: data.errors })
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => this.props.history.push('/'));
        }
      })
      // handle errors and rejected promise: issue with endpoint, api down, network connectivity error
      .catch( error => {
        console.log(error);
        // pushing to history stack will redirect to error page
        this.props.history.push('/error'); 
      });

  }

  cancel = () => {
    this.props.history.push('/');
  }
}
