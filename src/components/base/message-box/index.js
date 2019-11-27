/* eslint react/no-array-index-key: "off" */
// Disabling because text has no alternative for key

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { CloseButton } from '../button/icon-buttons';
import {
  MessageBoxText,
  StyledMessageBox,
  MessageBoxButtonContainer,
  MessageBoxButton,
} from './theme';
import Text from '../text';

const MessageBox = (props) => {
  const {
    type, children, hasButton, buttonHandler, style,
  } = props;

  return (
    <StyledMessageBox type={type} style={style}>
      <MessageBoxText type={type}>
        <span>
          {children
            ? children
              .split('\n')
              .map((item, i) => (
                <div key={`MessageBox_text_line_${i}`}><Text style={{ color: 'inherit' }}>{item}</Text></div>
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
            <CloseButton />
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
