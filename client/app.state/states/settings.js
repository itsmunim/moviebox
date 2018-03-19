import ActionTypes from '../action.types.js';

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

  static getCurrent(stateManager) {
    return stateManager.getStateFor('settingsPage');
  }

  static reduce(previousState, action) {
    let newState = Object.assign({}, previousState);

    switch (action.type) {
      case ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_OPEN:
        return SettingsPageState.updateFileExplorerModalState(newState, {isVisible: true});

      case ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_CLOSE:
        return SettingsPageState.updateFileExplorerModalState(newState, {isVisible: false});

      default:
        return previousState || {};
    }
  }

  static updateFileExplorerModalState(state, updates) {
    state.fileExplorerModal = Object.assign({}, state.fileExplorerModal, updates);
    return state;
  }
}

export default SettingsPageState;
