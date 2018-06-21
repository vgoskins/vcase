import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginButton extends Component {
  openLoginPopup(event) {
    event.preventDefault();
    window.open(
      '/auth',
      'login',
      'height=800,width=1028,resize=yes,scrollbars=yes'
    );
  }

  render() {
    return (
      <a
        href="#"
        className="login-btn"
        onClick={this.openLoginPopup.bind(this)}
      >
        <img src="img/steam-signin-button.png" />
      </a>
    );
  }
}

export default connect()(LoginButton);
