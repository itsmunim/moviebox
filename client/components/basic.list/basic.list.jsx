import React from 'react';

class BasicList extends React.Component {
  constructor(props) {
    super(props);
    this.listClass = 'basic-list ' + props.listClass;

    let ItemComponent = props.itemComponent;
    this.listItems = props.items.map((item) =>
      <ItemComponent item={item} key={JSON.stringify(item)}/>
    );
  }

  render() {
    return (
      <ul className={this.listClass}>
        { this.listItems }
      </ul>
    );
  }
}

export default BasicList;
