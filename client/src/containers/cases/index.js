import React, { Component } from 'react';
import { connect } from 'react-redux';
import Case from './case';
import RemainingKeys from './remaining-keys';
import { getCases, unbox } from '../../actions';
import ShuffleButton from './shuffle';
import AutoPick from './autopick';

class CaseList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getCases());
  }

  isUnboxing() {
    return this.props.unbox.state === 'IN_PROGRESS';
  }

  unbox(kase, amount) {
    if (this.isUnboxing()) {
      return; // For now, can only unbox one at a time
    }
    this.props.dispatch(unbox(kase, amount));
  }

  render() {
    return (
      <section className="selection">
        <div className="container header-selection">
          <div className="row">
            <RemainingKeys />
            <div className="col-xl-5 col-lg-3 col-md-3 col-sm-6 col-6 shuffle-cases text-right">
              <ShuffleButton />
            </div>
            <AutoPick unbox={this.unbox.bind(this)} className="d-md-none" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.props.cases.map((props, i) => (
              <div
                key={props.id}
                id={props.id}
                className="col-xl-3 col-md-3 col-sm-12"
              >
                <Case
                  onCaseDetailClicked={this.props.onCaseDetailClicked}
                  case={props}
                  unbox={this.unbox.bind(this)}
                />
              </div>
            ))}
          </div>
        </div>
        <AutoPick unbox={this.unbox.bind(this)} className="d-none d-md-block" />
      </section>
    );
  }
}

export default connect(state => ({
  cases: state.cases,
  unbox: state.unbox,
  tradeUrl: state.tradeUrl,
  keys: state.keys,
}))(CaseList);
