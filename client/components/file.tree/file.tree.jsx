import React from 'react';
import _ from 'lodash';
import FileItem from '../list.items/file.item/file.item.jsx';
import BasicList from '../basic.list/basic.list.jsx';
import Loader from '../loader/loader.jsx';
import ConditionalContainer from '../conditional.container/conditional.container.jsx';

class FileTree extends React.Component {
  isFileTreeLoaded() {
    return !_.isEmpty(this.props.fileTree);
  }

  render() {
    return (
      <div className="file-tree position-relative">
        <ConditionalContainer if={!this.isFileTreeLoaded()}>
          <Loader/>
        </ConditionalContainer>

        <ConditionalContainer if={this.isFileTreeLoaded()}>
          <h5 className="current-path">
            {_.get(this.props.fileTree, 'currentNode.path', '')}
          </h5>
          <div className="root-file d-flex flex-row">
            <i className="fas fa-folder-open mr-auto"></i>
            {_.get(this.props.fileTree, 'currentNode.name', _.get(this.props.fileTree, 'currentNode.path'))}
          </div>
          <div className="files">
            <BasicList itemComponent={FileItem} items={_.get(this.props.fileTree, 'currentNode.files', [])}/>
          </div>
        </ConditionalContainer>
      </div>
    );
  }
}

export default FileTree;
