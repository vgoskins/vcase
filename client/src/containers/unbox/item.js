import React, { Component } from 'react';

class CaseItem extends Component {
  render() {
    let visibilityClass = this.props.visibility || '';

    return (
      <div className="col-md-3 case-item">
        <div className="card mb-3 box-shadow">
          <div className={`card-image-container ${visibilityClass}`}>
            <img src={this.props.image['300px']} className="card-img-top" />
          </div>
          <div className="data">
            <p
              className={`${visibilityClass}`}
              style={{ color: this.props.color }}
            >
              {this.props.name}
            </p>
            <p className={`${visibilityClass}`}>
              {this.props.wearTier ? (
                <span className="wear-tier">{this.props.wearTier}</span>
              ) : null}
              <span className="txt-white">{this.props.category}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseItem;
