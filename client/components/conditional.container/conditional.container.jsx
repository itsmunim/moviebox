import React from 'react';

class ConditionalContainer extends React.Component {
  getDisplay() {
    return this.props.if ? 'block' : 'none';
  }

  render() {
    return (
      <div style={{display: this.props.if ? 'block': 'none'}}>
        {this.props.children}
      </div>
    );
  }
}

export default ConditionalContainer;
