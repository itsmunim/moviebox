import React from 'react';

import {BasicList, SettingsItem} from '../../components/components.jsx';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.settingsItems = [
      {
        title: 'Folders',
        subtitle: 'Specify Folder paths to scan for movie files(i.e. mp4, avi)',
        actions: [
          {
            title: 'Add Folder',
            type: 'primary',
            callback: () => {}
          }
        ]
      },
      {
        title: 'Exclude Folders',
        subtitle: 'Specify which Folders should be ignored during scan if they are present in selected Folder paths',
        actions: []
      }
    ];
  }

  render () {
    return (
      <div>
        <div className="container-fluid settings-page">
          <div className="row page-title">
            <h4>Settings</h4>
          </div>

          <div className="row page-content">
            <BasicList listClass={'settings-items'} itemComponent={SettingsItem} items={this.settingsItems}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
