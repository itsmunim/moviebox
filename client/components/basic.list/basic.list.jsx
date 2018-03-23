import React from 'react';
import _ from 'lodash';

class BasicList extends React.Component {

  getListClass() {
    return 'basic-list ' + _.get(this.props, 'listClass', '');
  }

  getListItems() {
    let ItemComponent = this.props.itemComponent;
    return this.props.items.map((item) =>
      <ItemComponent item={item} key={item.title || item.name}/>
    );
  }

  render() {
    return (
      <ul className={this.getListClass()}>
        { this.getListItems() }
      </ul>
    );
  }
}

export default BasicList;
