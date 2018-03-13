import React from 'react';
import FileItem from '../list.items/file.item/file.item.jsx';
import BasicList from '../basic.list/basic.list.jsx';

class FileTree extends React.Component {
  constructor(props) {
    super(props);
    this.fileTree = props.fileTree;
  }
  render() {
    return (
      <div className="file-tree">
        <h5 className="current-path">
          {(this.fileTree.selected || this.fileTree.root).path}
        </h5>
        <div className="root-file d-flex flex-row">
          <i className="fas fa-folder-open mr-auto"></i>
          {this.fileTree.root.name || this.fileTree.root.path}
        </div>
        <div className="files">
          <BasicList itemComponent={FileItem} items={this.fileTree.root.files}/>
        </div>
      </div>
    );
  }
}

export default FileTree;
