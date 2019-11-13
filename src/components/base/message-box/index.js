/* eslint react/no-array-index-key: "off" */
// Disabling because text has no alternative for key

import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import {
  MdClose,
} from 'react-icons/md';
import {
  MessageBoxText,
  StyledMessageBox,
  MessageBoxButtonContainer,
  MessageBoxButton,
} from './theme';
import Text from '../text';

const CloseButton = styled.svg``;
const CloseButtonBg = styled.rect`
  transition: all 0.3s;
  opacity: 0;
  ${CloseButton}:hover & {
    opacity: 1;
  }
`;
const CloseButtonPath = styled.path`
  transition: all 0.3s;
  stroke: #757575;
  ${CloseButton}:hover & {
    stroke: #424242;
  }
`;

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
            <CloseButton width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <CloseButtonBg width="24" height="24" rx="12" fill="#F5F5F5" />
              <CloseButtonPath d="M16 8.12903L8 16.3871" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <CloseButtonPath d="M8 8.12903L16 16.3871" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </CloseButton>
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
