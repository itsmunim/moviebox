import React from 'react';

class ConditionalContainer extends React.Component {
  render() {
    let containerType = this.props.cType || 'div';
    let ContainerTag = `${containerType}`;
    return (
      <ContainerTag className={this.props.cls} style={{display: this.props.if ? 'block': 'none'}}>
        {this.props.children}
      </ContainerTag>
    );
  }
}

export default ConditionalContainer;
