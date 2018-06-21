import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ErrorPopup from '../header/error';

class AutoPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.keys.minimum,
      showErrorMessage: false,
    };
  }

  quantityChanged(event) {
    event.preventDefault();
    const selectedQuantity = parseInt(event.target.value, 10);
    if (
      selectedQuantity >= this.props.keys.minimum &&
      selectedQuantity <= this.props.keys.available
    ) {
      this.setState({ quantity: selectedQuantity });
    }
  }

  addOne(event) {
    event.preventDefault();
    if (this.state.quantity < this.props.keys.available) {
      this.setState(prevState => ({ quantity: prevState.quantity + 1 }));
    }
  }

  removeOne(event) {
    event.preventDefault();
    if (this.state.quantity > this.props.keys.minimum) {
      this.setState(prevState => ({ quantity: prevState.quantity - 1 }));
    }
  }

  autoPick() {
    if (
      this.state.quantity >= this.props.keys.minimum &&
      this.state.quantity <= this.props.keys.available
    ) {
      // Pick one random case from the list
      const selectedCase = _.sample(this.props.cases);
      this.setState({ showErrorMessage: false });
      // Unbox the selected case with the selected quantity
      this.props.unbox(selectedCase.id, this.state.quantity);
    } else {
      this.setState({ showErrorMessage: true });
    }
  }

  cancel() {
    this.setState({ showErrorMessage: false });
  }

  render() {
    let errorPopup = null;
    if (this.state.showErrorMessage) {
      errorPopup = (
        <ErrorPopup
          message={`You must have a minimum of ${
            this.props.keys.minimum
          } vKeys to open vCases`}
          title="Notice"
          goBackHandler={this.cancel.bind(this)}
          buttonText="OK"
        />
      );
    }
    return (
      <Fragment>
        {errorPopup}
        <div
          className={
            this.props.className
              ? `container ${this.props.className}`
              : 'container'
          }
        >
          <div className="row footer-selection">
            <p>Auto-Pick Any Case</p>
            <div className="autopick-controls">
              <small className="quantity">Quantity</small>
              <div className="input-group number-spinner">
                <span className="input-group-btn data-dwn">
                  <button
                    className="btn btn-default btn-info"
                    data-dir="dwn"
                    onClick={this.removeOne.bind(this)}
                  >
                    <i className="icon-minus icons" />
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control text-center"
                  value={this.state.quantity}
                  onChange={this.quantityChanged.bind(this)}
                />
                <span className="input-group-btn data-up">
                  <button
                    className="btn btn-default btn-info"
                    data-dir="up"
                    onClick={this.addOne.bind(this)}
                  >
                    <i className="icon-plus icons" />
                  </button>
                </span>
              </div>
              <button
                type="button"
                className="btn auto-pick-btn"
                onClick={this.autoPick.bind(this)}
              >
                AUTO-PICK
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  keys: state.keys,
  cases: state.cases,
}))(AutoPick);
