import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorListener from './error-listener';
import NavUser from './nav-user';

class FixedHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-static-top visible">
        <a className="navbar-brand" href="#">
          <img src="img/logo-header.png" />
        </a>
        <div className="navbar-login">
          <NavUser />
        </div>
        <ErrorListener />
      </nav>
    );
  }
}

export default connect()(FixedHeader);
