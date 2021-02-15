import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { StyledText } from './theme';

const TextLink = (props) => {
  const { children = null, ...rest } = props;

  return (
    <StyledText {...rest} isLink>
      {children}
    </StyledText>
  );
};

TextLink.propTypes = {
  children: PropTypes.string,
};

export default withTheme(TextLink);
