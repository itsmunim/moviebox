import HeaderState from './states/header';
import SettingsPageState from './states/settings';
import FileExplorerState from './states/file.explorer';

const stateReducer = (previousState, action) => {
  let newState = Object.assign({}, previousState);
  newState.header = HeaderState.update(newState.header, action);
  newState.settingsPage = SettingsPageState.update(newState.settingsPage, action);
  newState.components = newState.components || {};
  newState.components.fileExplorer = FileExplorerState.update(newState.components.fileExplorer, action);
  return newState;
};

export default stateReducer;
