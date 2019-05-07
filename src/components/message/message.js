/* eslint react/no-array-index-key: "off" */
// Disabling because text has no alternative for key

import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.PureComponent {
  componentWillUnmount() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
  }

  startTimeout() {
    const { onClose, isEmbedded } = this.props;
    if (isEmbedded) { return; }
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
    this.currentTimeout = setTimeout(onClose, 5000);
  }

  render() {
    let classModifier;
    let iconModifier;
    let textModifier;
    let textMessage;
    const {
      message, type, onClose, isEmbedded,
    } = this.props;

    this.startTimeout();

    switch (type) {
      case 'success':
        classModifier = 'success';
        iconModifier = 'check';
        textMessage = message;
        textModifier = 'dark';
        break;
      case 'message':
        classModifier = 'message';
        iconModifier = 'info';
        textMessage = message;
        textModifier = 'light';
        break;
      case 'error':
        classModifier = 'danger';
        iconModifier = 'times';
        textMessage = message;
        textModifier = 'dark';
        break;
      case 'info':
        classModifier = 'info';
        iconModifier = 'info';
        textMessage = message;
        textModifier = 'dark';
        break;
      case 'warning':
        classModifier = 'warning';
        iconModifier = 'exclamation-triangle';
        textMessage = message;
        textModifier = 'dark';
        break;
      default:
        classModifier = '';
    }

    return (
      <div className={`${isEmbedded ? '' : 'message-container'}`}>
        <div className={`${isEmbedded ? '' : 'message--fadein'}`}>
          <div className={`message message--${classModifier} ${isEmbedded ? 'message-embed' : ''}`}>
            <div className={`message__logo message__logo--${classModifier}`}>
              <div className={`message__icon-container message__icon-container--${textModifier}`}>
                <i className={`message__icon message__icon--${classModifier} fas fa-${iconModifier}`} />
              </div>
            </div>
            <div className={`message__text message__text--${textModifier}`}>
              <span>
                {textMessage
                  ? textMessage.split('\n').map((item, i) => <div key={`message_text_line_${i}`}>{item}</div>)
                  : ''
                }
              </span>
            </div>
            {isEmbedded
              ? null
              : (
                <div className="message__button-container">
                  <button type="button" className="message__button-close" onClick={onClose}>
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

Message.propTypes = {
  onClose: PropTypes.func,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isEmbedded: PropTypes.bool,
};

Message.defaultProps = {
  onClose: null,
  isEmbedded: false,
};

export default Message;
