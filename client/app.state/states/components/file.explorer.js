import ActionTypes from '../../action.types.js';

class FileExplorerState {
  static updateVisibleFileTree(fileTree) {
    return {
      type: ActionTypes.FILE_EXPLORER__FILE_TREE_UPDATED,
      payload: fileTree
    };
  }

  static reduce(previousState, action) {
    let newState = Object.assign({}, previousState);

    switch (action.type) {
      case ActionTypes.FILE_EXPLORER__FILE_TREE_UPDATED:
        newState.fileTree = Object.assign({}, newState.fileTree, action.payload);
        return newState;

      default:
        return previousState || {};
    }
  }
}

export default FileExplorerState;
