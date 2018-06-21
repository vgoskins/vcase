import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorListener from './error-listener';
import NavUser from './nav-user';
import LoginButton from '../login/button';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class FloatingHeader extends Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      visible: false,
    };
  }

  handleScroll() {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (
      top >
      $('#home-button-container').offset().top +
        $('#home-button-container').height()
    ) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    let button;
    let divider;
    let navbarClassName = 'navbar navbar-static-top fixed-top';
    if (this.props.authenticated) {
      navbarClassName += ' hide-bg-and-logo';
      if (this.state.visible) {
        divider = <div className="nav-divider" />;
        button = (
          <Link to="/" className="open-case-btn-header">
            OPEN CASE
          </Link>
        );
      }
    } else {
      button = <LoginButton />;
    }
    if (this.state.visible) {
      navbarClassName += ' visible';
    }
    return (
      <nav className={navbarClassName}>
        <a className="navbar-brand" href="#">
          <img src="img/logo-header.png" />
        </a>
        <div className="navbar-login">
          {button}
          {divider}
          {this.props.authenticated ? (
            <NavUser isHome={this.props.isHome} />
          ) : null}
        </div>
        <ErrorListener />
      </nav>
    );
  }
}

export default connect(state => ({
  authenticated: state.auth.authenticated,
}))(FloatingHeader);
