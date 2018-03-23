import React from 'react';


class Loader extends React.Component {
  getLoaderStyle() {
    let color = this.props.color || '#000';
    return { borderColor: color + ' transparent ' + color + ' transparent'};
  }

  render() {
    return (
      <div className="loader-wrapper" style={{display: this.props.shouldShow ? 'block' : 'none'}}>
        <div className="lds-dual-ring" style={this.getLoaderStyle()}></div>
      </div>
    );
  }
}

export default Loader;
