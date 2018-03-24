import ActionTypes from '../../action.types.js';

class SettingsPageState {
  static showFileExplorerModal(target) {
    return {
      type: ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_OPEN,
      payload: target
    };
  }

  static addToRootFolderList(folder) {
    return {
      type: ActionTypes.SETTINGS_PAGE__ADD_TO_ROOT_FOLDER_LIST,
      payload: folder
    };
  }

  static addToExcludeFolderList(folder) {
    return {
      type: ActionTypes.SETTINGS_PAGE__ADD_TO_EXCLUDE_FOLDER_LIST,
      payload: folder
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
        newState.fileExplorerTarget = action.payload;
        return newState;

      case ActionTypes.SETTINGS_PAGE__FILE_EXPLORER_MODAL_CLOSE:
        newState.shouldShowFileExplorer = false;
        newState.fileExplorerTarget = '';
        return newState;

      case ActionTypes.SETTINGS_PAGE__ADD_TO_ROOT_FOLDER_LIST:
        newState.rootFolders = (newState.rootFolders || []).concat(action.payload);
        return newState;

      case ActionTypes.SETTINGS_PAGE__ADD_TO_EXCLUDE_FOLDER_LIST:
        newState.excludeFolders = (newState.excludeFolders || []).concat(action.payload);
        return newState;

      default:
        return previousState || {};
    }
  }
}

export default SettingsPageState;
