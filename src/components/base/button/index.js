import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Loader from '../loader';
import {
  SPINNER_SIZE,
  BaseButton,
  Container,
  ChildrenContainer,
  getSpinnerColor,
} from './theme';
import { NoOp } from '../../../utils/helpers';

const Button = ({
  children, size, type, fill, theme, loading, ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleClick = () => {
    const { onClick } = rest;

    if (loading === null) {
      setIsLoading(true);
      Promise.resolve()
        .then(onClick)
        .catch(err => err)
        .then(() => setIsLoading(false));
    } else {
      onClick();
    }
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
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'grey', 'submit']),
  size: PropTypes.oneOf(['tiny', 'small', 'large']),
  fill: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: 'primary',
  size: 'large',
  fill: 'filled',
  disabled: false,
  onClick: NoOp,
  loading: null,
};

export default withTheme(Button);
