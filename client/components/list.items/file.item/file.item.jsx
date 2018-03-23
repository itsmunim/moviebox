import React from 'react';

class FileItem extends React.Component {
  getIconClass() {
    return 'fas ' + (this.props.item.isDirectory ? 'fa-folder' : 'fa-file');
  }

  render() {
    return (
      <li className="file-item">
        <p>
          <i className={this.getIconClass()}></i>
          <span>{this.props.item.name}</span>
        </p>
      </li>
    );
  }
}

export default FileItem;
