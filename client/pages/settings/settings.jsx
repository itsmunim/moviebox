import classNames from 'classnames';
import React from 'react';

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

  getActionClassNames(type) {
    return classNames({
      'btn': true,
      'btn-sm': true,
      'btn-outline-primary': type === 'primary',
      'btn-outline-secondary': type === 'secondary'
    });
  }

  render () {
    return (
      <div>
        <div className="container-fluid settings-page">
          <div className="row page-title">
            <h4>Settings</h4>
          </div>

          <div className="row page-content">
            <ul className="settings-items">
              {
                /* settings items */
                this.settingsItems.map((settingsItem) => {
                  return (
                    /* settings item */
                    <li className="settings-item" key={settingsItem.title}>
                      <div className="settings-item-wrapper d-flex flex-row">
                        <div className="mr-auto">
                          <h5>{settingsItem.title}</h5>
                          <p>{settingsItem.subtitle}</p>
                        </div>
                        <div>

                          <ul className="settings-item-actions">
                            {
                              settingsItem.actions.map((action) => {
                                return (
                                  /* settings item action */
                                  <li className="settings-item-action" key={action.title}>
                                    <button onClick={() => action.callback() }
                                            className={this.getActionClassNames(action.type)}>
                                      {action.title}
                                    </button>
                                  </li>
                                );
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
