import React from 'react';
import PropTypes from 'prop-types';
import { NoOp } from '../../../utils/helpers';
import { CloseIcon } from '../icons';
import { Wrapper, IconWrapper, TextWrapper } from './theme';

const Badge = ({
  children,
  isClosable = false,
  onClose = NoOp,
  maxWidth = true,
}) => (
  <Wrapper>
    <TextWrapper maxWidth={maxWidth}>{children}</TextWrapper>
    {isClosable && (
      <IconWrapper onClick={onClose}>
        <CloseIcon size="8" color="#000" />
      </IconWrapper>
    )}
  </Wrapper>
);

Badge.propTypes = {
  isClosable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.bool,
};

export default Badge;
