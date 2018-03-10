import classNames from 'classnames';
import React from 'react';

class SettingsItemAction extends React.Component {
  constructor(props) {
    super(props);
    this.item = props.item;
  }

  getActionClassNames(type) {
    return classNames({
      'btn': true,
      'btn-sm': true,
      'btn-outline-primary': type === 'primary',
      'btn-outline-secondary': type === 'secondary'
    });
  }

  render() {
    return (
      <li className="settings-item-action">
        <button onClick={(event) => this.item.callback(event) }
                className={this.getActionClassNames(this.item.type)}>
          {this.item.title}
        </button>
      </li>
    );
  }
}

export default SettingsItemAction;
