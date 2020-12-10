import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { StyledText } from './theme';

const TextLink = (props) => {
  const { children, ...rest } = props;

  return (
    <StyledText {...rest} isLink>
      {children}
    </StyledText>
  );
};

TextLink.propTypes = {
  children: PropTypes.string,
};

TextLink.defaultProps = {
  children: null,
};

export default withTheme(TextLink);
