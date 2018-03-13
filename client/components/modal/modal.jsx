import React from 'react';
import classNames from 'classnames';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalBackdropStyle = {
      backgroundColor: 'rgba(0,0,0,0.5)'
    };
  }

  modalClasses() {
    return classNames({
      'modal': true,
      'd-block': this.props.isVisible
    });
  }

  render() {
    return (
      <div className={this.modalClasses()} style={this.modalBackdropStyle} onClick={() => this.props.onModalClose()}>
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
