import ActionTypes from '../action.types.js';

class SettingsPageState {
  static showFileExplorerModal() {
    return {
      type: ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_OPEN
    };
  }

  static showFileExplorerModal() {
    return {
      type: ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_CLOSE
    };
  }

  static getCurrent(stateManager) {
    return stateManager.getStateFor('settingsPage');
  }

  static update(previousState, action) {
    let newState = Object.assign({}, previousState);

    switch (action.type) {
      case ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_OPEN:
        return SettingsPageState.updateFileExplorerModalOpenState(newState, true);

      case ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_CLOSE:
        return SettingsPageState.updateFileExplorerModalOpenState(newState, false);

      default:
        return previousState;
    }
  }

  static updateFileExplorerModalOpenState(state, isOpen) {
    let settingsNavState = state.settingsNav || {};
    settingsNavState.isSelected = isSelected;
    state.settingsNav = settingsNavState;
    return state;
  }
}

export default SettingsPageState;
