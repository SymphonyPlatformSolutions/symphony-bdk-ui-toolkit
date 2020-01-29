import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import Tooltip from '../tooltip';
import { BaseText } from './theme';
import Box from '../../layout/box';

export default function Text(props) {
  const {
    children, isTitle, size, underline, tooltip, isLink, ...rest
  } = props;

  if (tooltip) {
    return (
      <Box horizontal space={5}>
        <BaseText isTitle={isTitle} size={size} underline={underline} {...rest}>
          {children}
        </BaseText>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </Box>
    );
  }
  return (
    <BaseText
      isTitle={isTitle}
      size={size}
      underline={underline}
      as={isLink ? 'a' : undefined}
      {...rest}
    >
      {children}
    </BaseText>
  );
}

Text.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'info']),
  isTitle: PropTypes.bool,
  size: PropTypes.oneOf(['tiny', 'small', 'regular', 'large']),
  px: PropTypes.string,
  py: PropTypes.string,
  mx: PropTypes.string,
  my: PropTypes.string,
  underline: PropTypes.bool,
  children: PropTypes.node,
  tooltip: PropTypes.string,
  isLink: PropTypes.bool,
};

Text.defaultProps = {
  isTitle: false,
  px: null,
  py: null,
  mx: null,
  my: null,
  size: 'regular',
  underline: false,
  children: null,
  type: 'secondary',
  tooltip: null,
  isLink: false,
};
