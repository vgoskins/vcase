import React, { Component, Fragment } from 'react';
import { Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import ErrorPopup from '../header/error';

class Case extends Component {
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

  unbox() {
    if (
      this.state.quantity >= this.props.keys.minimum &&
      this.state.quantity <= this.props.keys.available
    ) {
      this.setState({ showErrorMessage: false });
      this.props.unbox(this.props.case.id, this.state.quantity);
    } else {
      this.setState({ showErrorMessage: true });
    }
  }

  onCaseDetailClicked() {
    this.props.onCaseDetailClicked(this.props.case.id);
  }

  addOne(event) {
    event.preventDefault();
    if (this.state.quantity < this.props.keys.available) {
      this.setState({ quantity: this.state.quantity + 1 });
    }
  }

  removeOne(event) {
    event.preventDefault();
    if (this.state.quantity > this.props.keys.minimum) {
      this.setState({ quantity: this.state.quantity - 1 });
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
        <div className="card mb-3 box-shadow">
          <div className="card-image-container">
            <img
              src={this.props.case.image['300px']}
              alt={this.props.case.name}
              onError={e => {
                e.target.src = 'img/default-vcase.png';
              }}
              className="card-img-top"
            />
            <p>{this.props.case.name}</p>
          </div>

          <div className="card-body text-center">
            <div className="input-group number-spinner">
              <span className="input-group-btn data-dwn">
                <button
                  className="btn btn-default btn-info"
                  onClick={this.removeOne.bind(this)}
                >
                  <i className="icon-minus icons" />
                </button>
              </span>
              <Input
                className="form-control text-center"
                type="text"
                value={this.state.quantity}
                onChange={this.quantityChanged.bind(this)}
              />
              <span className="input-group-btn data-up">
                <button
                  className="btn btn-default btn-info"
                  onClick={this.addOne.bind(this)}
                >
                  <i className="icon-plus icons" />
                </button>
              </span>
            </div>
            <button
              onClick={this.unbox.bind(this)}
              type="button"
              className="btn"
            >
              OPEN CASE
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  keys: state.keys,
}))(Case);
