import { combineReducers } from 'redux';
import HeaderState from './states/header';
import SettingsPageState from './states/settings';
import componentsStateReducers from './states/components/index';

export default combineReducers({
  header: HeaderState.reduce,
  settingsPage: SettingsPageState.reduce,
  components: combineReducers(componentsStateReducers)
});
