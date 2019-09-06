/* eslint react/no-array-index-key: "off" */
// Disabling because text has no alternative for key

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import {
  MdClose,
} from 'react-icons/md';
import {
  MessageBoxIconContainer,
  MessageBoxLogo,
  MessageBoxText,
  StyledMessageBox,
  MessageBoxButtonContainer,
  MessageBoxButton,
  getIcon,
} from './theme';
import Text from '../text';

const MessageBox = (props) => {
  const {
    type, children, hasButton, buttonHandler, style,
    theme,
  } = props;

  return (
    <StyledMessageBox type={type} style={style}>
      <MessageBoxLogo type={type}>
        <MessageBoxIconContainer>
          {getIcon({ type, theme })}
        </MessageBoxIconContainer>
      </MessageBoxLogo>
      <MessageBoxText>
        <span>
          {children
            ? children
              .split('\n')
              .map((item, i) => (
                <div key={`MessageBox_text_line_${i}`}><Text style={{ color: 'inherit' }} px="0" py="0" my="0">{item}</Text></div>
              ))
            : ''}
        </span>
      </MessageBoxText>
      {hasButton
        && (
        <MessageBoxButtonContainer>
          <MessageBoxButton
            type="button"
            onClick={buttonHandler}
          >
            <MdClose color="#4d4d4d" size="1.2rem" />
          </MessageBoxButton>
        </MessageBoxButtonContainer>
        )
        }
    </StyledMessageBox>
  );
};

MessageBox.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  hasButton: PropTypes.bool,
  buttonHandler: PropTypes.func,
  style: PropTypes.object,
};

MessageBox.defaultProps = {
  type: 'info',
  hasButton: false,
  buttonHandler: null,
  style: undefined,
};

export default withTheme(MessageBox);
