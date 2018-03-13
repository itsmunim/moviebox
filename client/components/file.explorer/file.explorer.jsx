import React from 'react';
import FileTree from '../file.tree/file.tree.jsx';
import * as DataStructures from '../../common/classes/index.js';


class FileExplorer extends React.Component {
  constructor(props) {
    super(props);

    let root = new DataStructures.Directory('/');
    for (let i = 0; i < 10; i++) {
      root.files.push(new DataStructures.Directory('/' + 'folder' + i, root));
    }
    this.fileTree = new DataStructures.FileTree();
    this.fileTree.root = root;
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

export default FileExplorer;
