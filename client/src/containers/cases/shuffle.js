import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shuffleCases } from '../../actions';

class ShuffleButton extends Component {
  shuffle() {
    this.props.dispatch(shuffleCases());
  }

  render() {
    return (
      <button type="button" className="btn" onClick={this.shuffle.bind(this)}>
        SHUFFLE CASES
      </button>
    );
  }
}

export default connect()(ShuffleButton);
