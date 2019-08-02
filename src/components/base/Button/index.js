import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Loader from '../Loader';
import Box from '../Box';
import {
  getColor,
  getPadding,
  getFontSize,
  getBgColor,
  getBorderStyle,
  getHoverBgColor,
  getHoverActiveColor,
  getSpinnerColor,
  SPINNER_SIZE,
} from './theme';

const Container = styled(Box)`
display: flex;
position: relative;`;

const ChildrenContainer = styled(Box)`
  opacity: ${p => (p.isLoading ? 0.3 : 1)};
  cursor: ${p => (p.isLoading ? 'none' : 'inherit')};`;


const BaseButton = styled.button.attrs({
  fontFamily: 'Lato, sans-serif',
})`
  color: ${props => getColor(props)};
  font-size: ${props => getFontSize(props)};
  margin: 0;
  padding: ${props => getPadding(props)};
  background-color: ${props => getBgColor(props)};
  border: ${props => getBorderStyle(props)};
  border-radius: 22px;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  &:focus {
    outline: 0
  }
  &:hover {
    background: ${props => getHoverBgColor(props)};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${props => getHoverActiveColor(props)}
  }
`;


const Button = ({
  children, size, type, fill, theme, ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMouseOver, setMouseOver] = useState(false);

  const handleClick = () => {
    const { onClick } = rest;
    setIsLoading(true);
    Promise.resolve()
      .then(onClick)
      .catch(err => err)
      .then(() => setIsLoading(false));
  };

  return (
    <BaseButton
      size={size}
      type={type}
      fill={fill}
      {...rest}
      onClick={handleClick}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <Container>
        <ChildrenContainer isLoading={isLoading}>
          {children}
        </ChildrenContainer>
        {isLoading && (
        <Loader
          size={SPINNER_SIZE[size]}
          color={getSpinnerColor({
            theme, type, fill, isMouseOver,
          })}
        />
        )}
      </Container>
    </BaseButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'grey']),
  size: PropTypes.string,
  fill: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

Button.defaultProps = {
  type: 'primary',
  size: 'large',
  fill: 'filled',
  disabled: false,
};

export default withTheme(Button);
