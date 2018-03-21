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
    let fileTreeState = this.props.state.fileTree;
    this.fileTree = DataStructures.FileTree.createInstanceFromJSON(fileTreeState);
    if (!this.fileTree) {
      this.fileTree = new DataStructures.FileTree();
      this.fileTree.root = new DataStructures.Directory('/');
      this.fileTree.currentNode = this.fileTree.root;
      this.populateRootOfFileTree();
    }
  }

  populateRootOfFileTree() {
    FileExplorerService.fetchFilesInPath(this.fileTree.root.path)
      .then((files) => {
        this.fileTree.root.files = _.map(files, (file) => {
          let _objectCls = file.isDirectory ? DataStructures.Directory : DataStructures.File;
          return new _objectCls(file.path, this.fileTree.root);
        });
        this.props.updateVisibleFileTree(this.fileTree);
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
            <FileTree fileTree={this.fileTree}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.components.fileExplorer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateVisibleFileTree: FileExplorerState.updateVisibleFileTree
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer);
