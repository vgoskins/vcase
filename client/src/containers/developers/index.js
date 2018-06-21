import React, { Component } from 'react';

class Developers extends Component {
  render() {
    return (
      <section className="developers">
        <div
          className="container"
          style={{
            background: "url('img/back-footer.jpg') no-repeat center right",
          }}
        >
          <div className="row">
            <div className="col-lg-5 text-right title">
              <h2>Developers</h2>
              <p className="lead mb-0">
                Create your own vCase site using our open source code. Visit
                GitHub to get started.
              </p>
            </div>
            <div className="col-2 text-center">
              <img src="img/line-01.png" alt="" />
            </div>
            <div className="col-lg-5 text-left button">
              <a
                className="btn btn-primary"
                href="https://github.com/vgoskins"
                target="_blank"
              >
                GITHUB
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Developers;
