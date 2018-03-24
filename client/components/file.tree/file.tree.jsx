import React from 'react';
import _ from 'lodash';
import FileItem from '../list.items/file.item/file.item.jsx';
import BasicList from '../basic.list/basic.list.jsx';
import Loader from '../loader/loader.jsx';
import ConditionalContainer from '../conditional.container/conditional.container.jsx';
import * as DataStructures from '../../common/classes/index';

class FileTree extends React.Component {
  isFileTreeLoaded() {
    return !_.isEmpty(this.props.fileTree);
  }

  openFolder(fileItem) {
    let fileTreeCopy = DataStructures.FileTree.clone(this.props.fileTree);
    fileTreeCopy.currentNode = fileItem;
    this.props.onFileTreeUpdate(fileTreeCopy);
  }

  getCurrentPathNavigation() {
    if (!this.props.fileTree) { return; }
    let traversals = DataStructures.FileTree.getPathTraversalFromCurrentNode(this.props.fileTree);
    return traversals.map((file, index) => {
      let isLast = index === traversals.length - 1;
      let fileTraversalPathComponent = file.isDirectory && !isLast
        ? <span className="text-primary" onClick={() => this.openFolder(file)}>{file.name}</span>
        : <span className="text-secondary">{file.name}</span>;

      return <span key={file.path}><span>/</span>{fileTraversalPathComponent}</span>;
    });
  }

  getFileItemsWithEventHandlers() {
    return _.map(_.get(this.props.fileTree, 'currentNode.files', []), (fileItem) => {
      if (fileItem.isDirectory) {
        fileItem.open = () => {
          this.openFolder(fileItem);
        };
        fileItem.select = () => {
          this.props.onFolderChoose(fileItem);
        };
      }

      return fileItem;
    });
  }

  render() {
    return (
      <div className="file-tree position-relative">
        <ConditionalContainer if={!this.isFileTreeLoaded()}>
          <Loader/>
        </ConditionalContainer>

        <ConditionalContainer if={this.isFileTreeLoaded()}>
          <p className="current-path">
            {this.getCurrentPathNavigation()}
          </p>
          <p className="current-folder">
            <i className="fas fa-folder-open"></i>
            <span>
              {_.get(this.props.fileTree, 'currentNode.name', _.get(this.props.fileTree, 'currentNode.path'))}
            </span>
          </p>
          <div className="files">
            <BasicList listClass={'file-list max-h-400 y-scrollable'}
                       itemComponent={FileItem}
                       items={this.getFileItemsWithEventHandlers()}/>
          </div>
        </ConditionalContainer>
      </div>
    );
  }
}

export default FileTree;
