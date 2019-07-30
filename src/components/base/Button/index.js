import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import {darken, lighten} from 'polished';
import Loader from '../Loader';
import Box from '../Box';
import {
  getColor,
  getPadding,
  getFontSize,
  getBgColor,
  getBorderStyle,
  SPINNER_SIZE,
} from './theme';

const Container = styled(Box)`
display: flex;
position: relative;`;

const ChildrenContainer = styled(Box)`
  opacity: ${p => (p.isLoading ? 0.3 : 1)};
  cursor: ${p => (p.isLoading ? 'none' : 'inherit')};`;

const teste = (props) => {
  var m = darken(0.1, getBgColor(props));
  return m;
}

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
  &:disabled {
    opacity: 0.4
  }
  &:focus {
    background: ${props => darken(0.1, getBgColor(props))};
    outline: 0
  }
  &:hover {
    background: ${props => teste(props)};
  }
`;


const Button = ({
  children, size, type, fill, theme, ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    const { onClick } = rest;
    setIsLoading(true);
    Promise.resolve()
      .then(onClick)
      .catch(err => err)
      .then(() => setIsLoading(false));
  };

  return (
    <BaseButton size={size} type={type} fill={fill} {...rest} onClick={handleClick}>
      <Container>
        <ChildrenContainer isLoading={isLoading}>
          {children}
        </ChildrenContainer>
        {isLoading && (
        <Loader
          size={SPINNER_SIZE[size]}
          color={getColor({ type, fill, theme })}
        />
        )}
      </Container>
    </BaseButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  fill: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

Button.defaultProps = {
  type: 'cta',
  size: 'large',
  fill: 'outlined',
  disabled: false,
};

export default Button;
