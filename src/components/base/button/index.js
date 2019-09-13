import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../loader';
import {
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

const BUTTON_TYPES = {
  SUBMIT: 'submit',
  PRIMARY: 'primary',
  DANGER: 'danger',
  GREY: 'grey',
  SECONDARY: 'secondary',
};

const Button = ({
  children, size, type, fill, theme, loading, disabled, htmlType, ...rest
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
      type={type === BUTTON_TYPES.SUBMIT ? BUTTON_TYPES.SUBMIT : htmlType}
      buttonType={type}
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
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES).map(e => BUTTON_TYPES[e])),
  size: PropTypes.oneOf(['tiny', 'small', 'large']),
  fill: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  htmlType: PropTypes.string,
};

Button.defaultProps = {
  type: 'primary',
  size: 'large',
  fill: 'filled',
  disabled: false,
  onClick: NoOp,
  loading: null,
  htmlType: 'button',
};

export default withTheme(Button);
