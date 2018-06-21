import React, { Component } from 'react';
import { connect } from 'react-redux';
import { endUnboxing } from '../../actions';
import CaseItem from './item';

const INTERVAL_MS = 1000;

class UnboxResult extends Component {
  constructor(props) {
    super(props);
    this.openCases = this.props.unbox.items.length;
    this.state = {
      shownItems: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.showOneMoreItem();
    }, INTERVAL_MS);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  showOneMoreItem() {
    if (this.state.shownItems === this.openCases) {
      this.clearInterval();
    }
    this.setState({ shownItems: this.state.shownItems + 1 });
  }

  goBack() {
    // Update unbox status
    this.props.dispatch(endUnboxing());
  }

  render() {
    let text = `YOU GOT ${this.openCases} NEW ITEMS!`;
    if (this.props.unbox.state === 'OPENING_PARTIAL_FAILURE') {
      let failed = this.props.unbox.totalExpectedItems - this.openCases;
      text = `${
        this.openCases
      } cases successfully opened! ${failed} case openings did not complete, and those keys were not deducted from your balance. Please try opening ${failed} again.`;
    }
    const items = this.props.unbox.items;

    return (
      <section className="opening">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="txt-white centered">{text}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 centered">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.goBack.bind(this)}
              >
                CONTINUE
              </button>
              <hr className="line" />
            </div>
          </div>
          <div className="row">
            {items.map((item, i) => (
              <CaseItem
                key={i}
                name={item.name}
                category={item.category}
                image={item.image}
                color={item.color}
                wearTier={item.wearTier}
                visibility={this.state.shownItems > i ? 'fadein' : 'hidden'}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default connect(state => ({
  unbox: state.unbox,
}))(UnboxResult);
