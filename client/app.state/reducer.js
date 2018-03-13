import HeaderState from './states/header';
import SettingsPageState from './states/settings';

const stateReducer = (previousState, action) => {
  let newState = Object.assign({}, previousState);
  newState.header = HeaderState.update(newState.header, action);
  newState.settingsPage = SettingsPageState.update(newState.settingsPage, action);
  return newState;
};

export default stateReducer;
