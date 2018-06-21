import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthStatus } from '../../actions';

class LoginCallback extends Component {
  componentWillMount() {
    this.props.dispatch(getAuthStatus());
  }

  render() {
    if (this.props.authenticated) {
      window.close();
    }
    return <div className="login-callback" />;
  }
}

export default connect(state => ({
  authenticated: state.auth.authenticated,
}))(LoginCallback);
