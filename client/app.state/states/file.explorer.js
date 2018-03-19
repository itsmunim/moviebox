import _ from 'lodash';
import ActionTypes from '../action.types.js';

class FileExplorerState {
  static updateVisibleFileTree(fileTree) {
    return {
      type: ActionTypes.FILE_EXPLORER__FILE_TREE_UPDATED,
      data: fileTree
    };
  }

  static getCurrent(stateManager) {
    return _.get(stateManager.getStateFor('components'), 'fileExplorer', {});
  }

  static update(previousState, action) {
    let newState = Object.assign({}, previousState);

    switch (action.type) {
      case ActionTypes.FILE_EXPLORER__FILE_TREE_UPDATED:
        return FileExplorerState.updateState(newState, {fileTree: action.data});

      default:
        return previousState;
    }
  }

  static updateState(state, updates) {
    state = Object.assign({}, state, updates);
    return state;
  }
}

export default FileExplorerState;
