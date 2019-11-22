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
  padding: 0 20px;
  position: absolute;
  height: 16px;
  opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
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
        <LoaderContainer circular={circular} size={size} isLoading={isLoading}>
          <Loader
            color={fill === FILL_TYPES.FILLED ? 'white' : undefined}
            size="small"
          />
        </LoaderContainer>
        <ChildrenContainer isLoading={isLoading} fill={fill}>
          <TextContainer>
            {children}
          </TextContainer>
        </ChildrenContainer>
      </Container>
    </BaseButton>
  );
};

const CloseSVG = styled.svg`
  cursor: pointer;
`;
const CloseSVGBg = styled.rect`
  transition: all 0.3s;
  opacity: 0;
  ${CloseSVG}:hover & {
    opacity: 1;
  }
`;
const CloseSVGPath = styled.path`
  transition: all 0.3s;
  stroke: ${({ theme }) => theme.colors.grey_600};
  ${CloseSVG}:hover & {
    stroke: ${({ theme }) => theme.colors.grey_800};
  }
`;
const ThemelessCloseButton = ({ theme }) => (
  <CloseSVG width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <CloseSVGBg width="24" height="24" rx="12" fill={theme.colors.grey_100} />
    <CloseSVGPath d="M16 8.12903L8 16.3871" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <CloseSVGPath d="M8 8.12903L16 16.3871" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </CloseSVG>
);

export const CloseButton = withTheme(ThemelessCloseButton);

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
