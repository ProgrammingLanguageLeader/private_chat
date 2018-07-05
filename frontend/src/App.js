import React, { Component } from 'react';

import './App.css';
import Logo from './components/Logo/Logo';
import 'tachyons';
import Signin from './components/Signin/Signin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: ''
    }
  }

  onRouteChange = (route) => {
    this.setState({
      route: route
    });
  }

  render() {
    return (
      <div>
        { this.state.route === 'home'
          ? <div>
              <p className='f1 pa2 white' onClick={() => this.onRouteChange('')}>
                You are logged in! (click to Sign Out)
              </p>
            </div>
          : <Logo onRouteChange={this.onRouteChange} />
        }
        { this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} />
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
