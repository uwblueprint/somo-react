import React from 'react';
import PureComponent from 'react-pure-render/component';

import LoginPage from '../components/LoginPage.jsx';

export default class LoginContainer extends PureComponent {
  render() {
    return (
      <LoginPage />
    );
  }
}
