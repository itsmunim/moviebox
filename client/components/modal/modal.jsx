import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  getComponentClasses() {
    let classes = ['modal'];
    if (this.props.isVisible) {
      classes.push('show');
      classes.push('backdrop-visible');
    }
    return classes.join(' ');
  }

  render() {
    return (
      <div className={this.getComponentClasses()} onClick={() => this.props.onModalClose()}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.props.title}
              </h5>
              <button type="button" className="close" onClick={() => this.props.onModalClose()}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Modal;
