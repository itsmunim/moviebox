import React from 'react';
import BasicList from '../../basic.list/basic.list.jsx';
import SettingsItemAction from '../settings.item.action/settings.item.action.jsx';

class SettingsItem extends React.Component {
  constructor(props) {
    super(props);
    this.item = props.item;
  }
  render() {
    return (
      <li className="settings-item">
        <div className="settings-item-wrapper d-flex flex-row">
          <div className="mr-auto">
            <h5>{this.item.title}</h5>
            <p>{this.item.subtitle}</p>
          </div>
          <div>
            <BasicList listClass={'settings-item-actions'} itemComponent={SettingsItemAction} items={this.item.actions}/>
          </div>
        </div>
      </li>
    );
  }
}

export default SettingsItem;
