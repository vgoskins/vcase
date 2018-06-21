import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorPopup extends Component {
  render() {
    return (
      <div>
        <div
          className="modal fade show"
          id="errorModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="errorModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body text-center">
                <h5 className="text-center text-uppercase">
                  {this.props.title || 'Error'}
                </h5>
                {/*TODO: Refactor error messages to accept components instead of plain text, so that we can avoid this type of workaround. We had to implement this because of a time constraint.*/}
                <p
                  className="text-white"
                  dangerouslySetInnerHTML={{ __html: this.props.message }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary text-uppercase"
                  onClick={this.props.goBackHandler}
                >
                  {this.props.buttonText || 'Go Back'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity" />
      </div>
    );
  }
}

export default connect()(ErrorPopup);
