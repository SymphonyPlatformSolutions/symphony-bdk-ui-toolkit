import React from 'react';
import PropTypes from 'prop-types';

class MessageBox extends React.PureComponent {
  render() {
    const {
      icon, iconImage, message, iconColor, messageColor, boxColor,
    } = this.props;
    return (
      <div className={`message-box message-box--${boxColor}`}>
        {
          icon
            ? <i className={`${icon} message-box__icon message-box__icon--${iconColor}`} />
            : <img className="message-box__img" src={iconImage} alt="info" />
        }
        <span
          className={`message-box__message message-box__message--${messageColor}`}
        >{message}
        </span>
      </div>
    );
  }
}

MessageBox.propTypes = {
  boxColor: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconImage: PropTypes.string,
  message: PropTypes.string,
  messageColor: PropTypes.string,
};

MessageBox.defaultProps = {
  boxColor: null,
  icon: null,
  iconColor: null,
  iconImage: null,
  message: null,
  messageColor: null,
};

export default MessageBox;
