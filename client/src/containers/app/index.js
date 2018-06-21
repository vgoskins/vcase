import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';
import Login from '../login';
import Info from '../info';
import LoginCallback from '../login/callback';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class App extends Component {
  render() {
    let routes;
    if (this.props.authenticated) {
      routes = (
        <Fragment>
          <Route exact path="/info" component={Info} />
          <Route exact path="/" component={Home} />
        </Fragment>
      );
    } else {
      routes = (
        <Fragment>
          <Route path="/" component={Login} />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Switch>
          <Route exact path="/login/callback" component={LoginCallback} />
          {routes}
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(state => ({
    authenticated: state.auth.authenticated,
  }))(App)
);
