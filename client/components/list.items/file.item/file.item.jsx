import React from 'react';

class FileItem extends React.Component {
  constructor(props) {
    super(props);
    this.item = props.item;
    this.iconClass = 'fas mr-auto ' + (props.item.isDirectory ? 'fa-folder' : 'fa-file');
  }

  render() {
    return (
      <li className="file-item">
        <div className="file-item-wrapper d-flex flex-row">
          <i className={this.iconClass}></i>
          <p>{this.item.name}</p>
        </div>
      </li>
    );
  }
}

export default FileItem;
