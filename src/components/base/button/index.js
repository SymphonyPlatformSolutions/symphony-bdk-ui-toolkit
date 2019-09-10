import React, { useState, useEffect } from 'react';
import { darken, lighten } from 'polished';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

import Loader from '../loader';
import {
  SPINNER_SIZE,
  BaseButton,
  Container,
  ChildrenContainer,
  getSpinnerColor,
} from './theme';
import { NoOp } from '../../../utils/helpers';

const LoaderContainer = styled.div`
  position: absolute;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: -2px;
  margin-top: 0 !important;
`;

const Button = ({
  children, size, type, fill, theme, loading, disabled, ...rest
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
      isLoading={isLoading}
      disabled={isLoading || disabled}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <Container>
        <ChildrenContainer isLoading={isLoading}>
          {children}
        </ChildrenContainer>
        {isLoading && (
          <LoaderContainer>
            <Loader
              color={getSpinnerColor(({ type, fill, theme }))}
              type="v2"
              presetSize="small"
            />
          </LoaderContainer>
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
