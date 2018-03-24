import React from 'react';
import ConditionalContainer from '../../conditional.container/conditional.container.jsx';

class FileItem extends React.Component {
  getIconClass() {
    return 'fas ' + (this.props.item.isDirectory ? 'fa-folder' : 'fa-film');
  }

  getFileItemClass() {
    return 'file-item ' + (this.props.item.isDirectory ? 'folder-type' : 'file-type');
  }

  getFileNameClass() {
    return 'file-item-name ' + (this.props.item.isDirectory ? 'folder-type' : 'file-type');
  }

  render() {
    return (
      <li className={this.getFileItemClass()}
          onDoubleClick={() => this.props.item.open(this.props.item)}>
        <div className="d-flex flex-row justify-content-center">
          <div className="mr-auto">
            <p className={this.getFileNameClass()}>
              <span className="icon-holder">
                <i className={this.getIconClass()}></i>
              </span>
              <span>{this.props.item.name}</span>
            </p>
            <ConditionalContainer cType={'p'} cls={'help-text'} if={this.props.item.isDirectory}>
              <small>Double click to go inside</small>
            </ConditionalContainer>
          </div>

          <ConditionalContainer cls={'mr-auto-0'} if={this.props.item.isDirectory}>
            <a href="#" className="btn-select-folder text-primary"
               onClick={() => this.props.item.select(this.props.item)}>
              Select
            </a>
          </ConditionalContainer>
        </div>
      </li>
    );
  }
}

export default FileItem;
