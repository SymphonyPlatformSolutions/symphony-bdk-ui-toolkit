import React, { useState, useEffect } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../loader';
import {
  BaseButton,
  Container,
  ChildrenContainer,
  BUTTON_TYPES,
  TextContainer,
  FILL_TYPES,
  LoaderContainer,
} from './theme';
import { NoOp } from '../../../utils/helpers';

const Button = ({
  children,
  theme,
  type = 'primary',
  size = 'regular',
  fill = 'filled',
  disabled = false,
  onClick = NoOp,
  loading = null,
  htmlType = 'button',
  circular = false,
  darkenOnDisable = true,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleClick = () => {
    if (loading === null) {
      setIsLoading(true);
      Promise.resolve()
        .then(onClick)
        .catch((err) => err)
        .then(() => setIsLoading(false));
    } else {
      onClick();
    }
  };

  return (
    <BaseButton
      size={size}
      type={type === BUTTON_TYPES.SUBMIT ? BUTTON_TYPES.SUBMIT : htmlType}
      buttonType={type}
      fill={fill}
      darkenOnDisable={darkenOnDisable}
      {...rest}
      onClick={handleClick}
      isLoading={isLoading}
      circular={circular}
      disabled={isLoading || disabled}
    >
      <Container
        justify="center"
        align="center"
        type="flat"
        circular={circular}
      >
        {isLoading && (
          <LoaderContainer
            circular={circular}
            size={size}
            isLoading={isLoading}
          >
            <Loader
              color={fill === FILL_TYPES.FILLED ? 'white' : undefined}
              size="small"
            />
          </LoaderContainer>
        )}
        <ChildrenContainer isLoading={isLoading} fill={fill}>
          <TextContainer>{children}</TextContainer>
        </ChildrenContainer>
      </Container>
    </BaseButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  fill: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  disabled: PropTypes.bool,
  darkenOnDisable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  htmlType: PropTypes.string,
  circular: PropTypes.bool,
};

export default withTheme(Button);
