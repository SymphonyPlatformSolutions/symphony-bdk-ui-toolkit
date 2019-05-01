/* eslint react/no-array-index-key: "off" */
// Disabling because text has no alternative for key

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Presentational Component for **Toast**. Appears on a fixed position in screen, starts a timer,
 * and removes itself when timer is done or "x" is clicked.
 * Connected to Redux via **ToastContainer**.
 */
class Toast extends React.PureComponent {
  componentWillUnmount() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
  }

  startTimeout() {
    const { toastHide, isEmbedded } = this.props;
    if (isEmbedded) { return; }
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
    this.currentTimeout = setTimeout(toastHide, 5000);
  }

  render() {
    let classModifier;
    let iconModifier;
    let textModifier;
    let textMessage;
    const {
      toastText, toastType, toastHide, isEmbedded, errorMessage,
    } = this.props;

    this.startTimeout();

    switch (toastType) {
      case 'success':
        classModifier = 'success';
        iconModifier = 'check';
        textMessage = toastText;
        textModifier = 'dark';
        break;
      case 'message':
        classModifier = 'message';
        iconModifier = 'info';
        textMessage = toastText;
        textModifier = 'light';
        break;
      case 'error':
        classModifier = 'danger';
        iconModifier = 'times';
        textMessage = `${toastText}: ${errorMessage}`;
        textModifier = 'dark';
        break;
      case 'info':
        classModifier = 'info';
        iconModifier = 'info';
        textMessage = toastText;
        textModifier = 'dark';
        break;
      case 'warning':
        classModifier = 'warning';
        iconModifier = 'exclamation-triangle';
        textMessage = toastText;
        textModifier = 'dark';
        break;
      default:
        classModifier = '';
    }

    return (
      <div className={`${isEmbedded ? '' : 'toast-container'}`}>
        <div className={`${isEmbedded ? '' : 'toast--fadein'}`}>
          <div className={`toast toast--${classModifier} ${isEmbedded ? 'toast-embed' : ''}`}>
            <div className={`toast__logo toast__logo--${classModifier}`}>
              <div className={`toast__icon-container toast__icon-container--${textModifier}`}>
                <i className={`toast__icon toast__icon--${classModifier} fas fa-${iconModifier}`} />
              </div>
            </div>
            <div className={`toast__text toast__text--${textModifier}`}>
              <span>
                {textMessage
                  ? textMessage.split('\n').map((item, i) => <div key={`toast_text_line_${i}`}>{item}</div>)
                  : ''
                }
              </span>
            </div>
            {isEmbedded
              ? null
              : (
                <div className="toast__button-container">
                  <button type="button" className="toast__button-close" onClick={toastHide}>
                    <i className="fas fa-times" />
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

Toast.propTypes = {
  /** Callback to hide the Toast. Comes from Container,
   *  and triggers the Redux removeToast action. */
  toastHide: PropTypes.func,
  /** Text to be displayed */
  toastText: PropTypes.string.isRequired,
  /** Type of Toast. Can be **success** or **error** */
  toastType: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  /** Boolean to see if Toast is to be positioned on the page, or to float above */
  isEmbedded: PropTypes.bool,
};

Toast.defaultProps = {
  toastHide: undefined,
  isEmbedded: false,
  errorMessage: null,
};

export default Toast;
