import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FloatingHeader from '../header/floating';
import { Link } from 'react-router-dom';
import FaqList from '../faq';
import Developers from '../developers';

class Info extends Component {
  render() {
    return (
      <Fragment>
        <FloatingHeader isHome />
        <header className="masthead text-white text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div className="logged-in">
                  <div id="home-button-container" className="col-12 but-header">
                    <Link to="/" className="btn btn-lg btn-primary">
                      OPEN CASE
                    </Link>
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

export default connect()(Info);
