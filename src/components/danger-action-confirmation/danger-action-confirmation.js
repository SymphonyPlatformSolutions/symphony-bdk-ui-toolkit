import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Button from '../button/button';

class DangerActionConfirmation extends React.PureComponent {
  render() {
    const {
      show,
      message,
      confirmButtonText,
      dismissCallback,
      confirmCallback,
    } = this.props;

    return (
      <ReactModal
        isOpen={show}
        onRequestClose={dismissCallback}
        contentLabel="Delete Confirmation Modal"
        className="modal-body"
        overlayClassName="modal-overlay"
      >
        <div className="danger-action-confirmation">
          <span className="danger-action-confirmation__title modal-title">Are you sure?</span>
          <span className="danger-action-confirmation__message">{message}</span>
          <div className="danger-action-confirmation__buttons">
            <Button
              type="outline"
              color="danger"
              onClick={dismissCallback}
            >Cancel
            </Button>
            <div className="danger-action-confirmation__right-button">
              <Button
                type="raised"
                color="danger"
                onClick={confirmCallback}
              >{confirmButtonText}
              </Button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

DangerActionConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  dismissCallback: PropTypes.func.isRequired,
  confirmCallback: PropTypes.func.isRequired,
};

export default DangerActionConfirmation;
