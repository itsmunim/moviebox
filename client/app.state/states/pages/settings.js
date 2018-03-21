import ActionTypes from '../../action.types.js';

class SettingsPageState {
  static showFileExplorerModal() {
    return {
      type: ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_OPEN
    };
  }

  static hideFileExplorerModal() {
    return {
      type: ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_CLOSE
    };
  }

  static reduce(previousState, action) {
    let newState = Object.assign({}, previousState);

    switch (action.type) {
      case ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_OPEN:
        newState.shouldShowFileExplorer = true;
        return newState;

      case ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_CLOSE:
        newState.shouldShowFileExplorer = false;
        return newState;

      default:
        return previousState || {};
    }
  }
}

export default SettingsPageState;
