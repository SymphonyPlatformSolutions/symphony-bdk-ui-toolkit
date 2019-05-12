import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import Loader from '../Loader';
import Box from '../Box';

const COLORS = {
  caution: colors.caution,
  cta: colors.cta,
  system: colors.system,
  darkgrey: colors.darkgrey,
};
const PADDING = {
  tiny: '3px 10px',
  small: '5px 15px',
  large: '5px 20px',
};
const FONTSIZE = {
  tiny: '0.5em',
  small: '0.7em',
  large: '1em',
};
const SPINNER_SIZE = {
  tiny: 8,
  small: 10,
  large: 15,
};

const getColor = (type, fill) => (fill === 'ghost' ? COLORS[type]
  : (fill === 'filled' ? colors.white : COLORS[type]));
const getPadding = size => PADDING[size];
const getFontSize = size => FONTSIZE[size];
const getBgColor = (fill, type) => (fill === 'filled' ? getColor(type) : 'transparent');
const getBorderStyle = (fill, type) => (fill === 'filled' || fill === 'ghost' ? 'none' : `2px solid ${getColor(type)}`);


const Button = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    const { onClick } = props;
    setIsLoading(true);
    Promise.resolve()
      .then(onClick)
      .catch(err => err)
      .then(() => setIsLoading(false));
  };

  const {
    children, size, type, fill, ...rest
  } = props;
  return (
    <BaseButton size={size} type={type} fill={fill} {...rest} onClick={handleClick}>
      <Container>
        <ChildrenContainer isLoading={isLoading}>
          {children}
        </ChildrenContainer>
        {isLoading && (
        <Loader
          size={SPINNER_SIZE[size]}
          color={getColor(type, fill)}
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
};

Button.defaultProps = {
  type: 'cta',
  size: 'large',
  fill: 'outlined',
  disabled: false,
};

export default Button;

const Container = styled(Box)`
display: flex;
position: relative;`;

const ChildrenContainer = styled(Box)`
  opacity: ${p => (p.isLoading ? 0.3 : 1)};
  cursor: ${p => (p.isLoading ? 'none' : 'inherit')};`;

const BaseButton = styled.button.attrs({
  fontFamily: 'Lato, sans-serif',
})`
  color: ${p => getColor(p.type, p.fill)};
  font-size: ${p => getFontSize(p.size)};
  margin: 1em;
  padding: ${p => getPadding(p.size)};
  background-color: ${p => getBgColor(p.fill, p.type)};
  border: ${p => getBorderStyle(p.fill, p.type)};
  border-radius: 22px;
  cursor: ${p => (p.disabled ? 'none' : 'pointer')};
  &:disabled {
    opacity: 0.4
  }
  &:focus {
    outline: 0
  }
`;
