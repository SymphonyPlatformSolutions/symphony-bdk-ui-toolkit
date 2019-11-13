import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../loader';
import {
  BaseButton,
  Container,
  ChildrenContainer,
  BUTTON_TYPES,
  TextContainer,
  FILL_TYPES,
} from './theme';
import { NoOp } from '../../../utils/helpers';

const LoaderContainer = styled.div`
    display: flex;
    position: absolute;
    height: 16px;
`;

const Button = ({
  children, size, type, fill, theme, loading, disabled, htmlType, circular, ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
      type={type === BUTTON_TYPES.SUBMIT ? BUTTON_TYPES.SUBMIT : htmlType}
      buttonType={type}
      fill={fill}
      {...rest}
      onClick={handleClick}
      isLoading={isLoading}
      circular={circular}
      disabled={isLoading || disabled}
    >
      <Container justify="center" align="center" type="flat">
        {isLoading ? (
          <LoaderContainer circular={circular} size={size}>
            <Loader
              color={fill === FILL_TYPES.FILLED ? 'white' : undefined}
              size="small"
            />
          </LoaderContainer>
        ) : (
          <ChildrenContainer isLoading={isLoading} fill={fill}>
            <TextContainer>
              {children}
            </TextContainer>
          </ChildrenContainer>
        )}
      </Container>
    </BaseButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES).map(e => BUTTON_TYPES[e])),
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  fill: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  htmlType: PropTypes.string,
  circular: PropTypes.bool,
};

Button.defaultProps = {
  type: 'primary',
  size: 'regular',
  fill: 'filled',
  disabled: false,
  onClick: NoOp,
  loading: null,
  htmlType: 'button',
  circular: false,
};

export default withTheme(Button);
