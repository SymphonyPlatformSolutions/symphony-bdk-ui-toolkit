import React, { useState } from 'react';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';
import { NoOp } from '../../../utils/helpers';
import {CloseIcon} from '../icons';
import {Wrapper, IconWrapper} from './theme';

const Badge = ({
  children, isClosable, onClose, theme
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Wrapper>
      { children }
      { isClosable && 
        <IconWrapper
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={onClose}>
          <CloseIcon
            size="8"
            color={isHovering ? theme.colors.grey_400 : theme.colors.grey_200}
          />
        </IconWrapper>
      }
    </Wrapper>
  );
};

Badge.propTypes = {
  isClosable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
};

Badge.defaultProps = {
  isClosable: false,
  onClose: NoOp
};

export default withTheme(Badge);
