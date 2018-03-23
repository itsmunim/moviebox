import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import FileTree from '../file.tree/file.tree.jsx';
import * as DataStructures from '../../common/classes/index.js';
import FileExplorerService from '../../common/services/file.explorer.service';
import FileExplorerState from '../../app.state/states/components/file.explorer';


class FileExplorer extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.fileTree) {
      this.populateFileTree('/');
    }
  }

  populateFileTree(rootPath) {
    let fileTree = new DataStructures.FileTree();
    fileTree.root = new DataStructures.Directory(rootPath);
    fileTree.currentNode = fileTree.root;

    FileExplorerService.fetchFilesInPath(fileTree.root.path)
      .then((files) => {
        fileTree.root.files = _.map(files, (file) => {
          let _objectCls = file.isDirectory ? DataStructures.Directory : DataStructures.File;
          return new _objectCls(file.path, fileTree.root);
        });
        this.props.updateVisibleFileTree(fileTree);
      });
  }

  render() {
    return (
      <div className="file-explorer-wrapper">
        <div className="file-explorer">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search folder by it's name"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Search</button>
            </div>
          </div>
          <div className="container">
            <FileTree fileTree={this.props.fileTree}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let fileTreeJSON = state.components.fileExplorer.fileTree;
  return {
    fileTree: DataStructures.FileTree.createInstanceFromJSON(fileTreeJSON)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateVisibleFileTree: FileExplorerState.updateVisibleFileTree
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer);
