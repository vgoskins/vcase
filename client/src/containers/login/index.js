import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoginButton from './button';
import { getAuthStatus } from '../../actions';
import FloatingHeader from '../header/floating';
import FaqList from '../faq';
import Developers from '../developers';

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(getAuthStatus());
  }

  render() {
    return (
      <Fragment>
        <FloatingHeader />
        <header className="masthead text-white text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div className="form-row login-form">
                  <h5 className="col-12">Sign in to start</h5>
                  <div id="home-button-container" className="col-12 but-header">
                    <LoginButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className={'chev-container'}>
          <div className={'left'} />
          <div className={'right'} />
          <div className={'left2'} />
          <div className={'right2'} />
        </div>
        <FaqList />
        <div className="divisor">
          <div className="chev-container">
            <div className="left" />
            <div className="right" />
            <div className="left2" />
            <div className="right2" />
          </div>
        </div>
        <Developers />
      </Fragment>
    );
  }
}

export default connect(state => ({
  authenticated: state.auth.authenticated,
}))(Login);
