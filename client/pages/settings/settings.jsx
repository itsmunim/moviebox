import React from 'react';
import _ from 'lodash';

import {BasicList, SettingsItem, Modal} from '../../components/components.jsx';
import SettingsPageState from '../../app.state/states/settings';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.stateManager = props.stateManager;
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

  isFileExplorerModalVisible() {
    return _.get(SettingsPageState.getCurrent(this.stateManager), 'fileExplorerModal.isVisible', false);
  }

  closeFileExplorerModal() {
    this.stateManager.dispatchAction(SettingsPageState.hideFileExplorerModal());
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
        <Modal title={'Select a root folder'}
               isVisible={this.isFileExplorerModalVisible()} onModalClose={() => this.closeFileExplorerModal()}>

        </Modal>
      </div>
    );
  }
}

export default SettingsPage;
