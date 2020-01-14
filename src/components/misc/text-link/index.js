import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Text from '../text';

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary_200};
`;

const TextLink = (props) => {
  const { children, ...rest } = props;
  return (
    <StyledText
      {...rest}
      isLink
    >{children}
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
