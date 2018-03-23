import React from 'react';

class FileItem extends React.Component {
  getIconClass() {
    return 'fas ' + (this.props.item.isDirectory ? 'fa-folder' : 'fa-file');
  }

  render() {
    return (
      <li className="file-item">
        <p>
          <span className="icon-holder">
            <i className={this.getIconClass()}></i>
          </span>
          <span>{this.props.item.name}</span>
        </p>
      </li>
    );
  }
}

export default FileItem;
