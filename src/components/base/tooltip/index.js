import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { MdInfo } from 'react-icons/md';
// eslint-disable-next-line import/no-cycle
import Text from '../text';

const Container = styled.div`
  position: relative;
  text-align: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  width: 1rem;
  display: flex;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 16px;
  height: 16px;
  z-index: 8;
  color: ${({ theme }) => theme.colors.grey_400};
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.grey_600};
  }
`;

const Bubble = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.grey_800};
  padding: 0.4rem 1rem;
  line-height: 0.9rem;
  min-width: 10rem;
  max-width: 20rem;
  border-radius: 3px;
  transform: translate(-50%, ${({ bottom }) => (bottom ? '26px' : 'calc(-100% - 8px)')});
  left: ${({ xPosition }) => `${xPosition + 8}px`};
  top: ${({ yPosition }) => `${yPosition}px`};
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 10;
  text-align: center;

  &::after {
    border-radius: 4px;
    content: " ";
    position: absolute;
    transform: rotate(45deg);
    left: calc(50% - 2px);
    margin-left: -0.4rem;
    border-width: 0.5rem;
    border-style: solid;
    position: absolute;
    ${({ bottom }) => (bottom ? 'bottom' : 'top')}:
      ${({ addPercentage }) => `${addPercentage * 3 + 68}%`};
    left: calc(50% - 2px);
    border-color: ${({ theme }) => theme.colors.grey_800};
    z-index: -1;
  }
`;

const TooltipBubble = (props) => {
  const {
    show, children, bottom, theme, tooltipRef,
  } = props;

  return ReactDOM.createPortal(
    <Bubble
      show={show}
      bottom={bottom}
      addPercentage={Math.floor(children.length / 25)}
      xPosition={
        tooltipRef.current
          ? tooltipRef.current.getBoundingClientRect().x + window.scrollX
          : 0
      }
      yPosition={
        tooltipRef.current
          ? tooltipRef.current.getBoundingClientRect().y + window.scrollY
          : 0
      }
    >

      <Text
        size="small"
        style={{ color: theme.colors.grey_050, fontStyle: 'normal' }}
      >
        {children}
      </Text>
    </Bubble>,
    document.body,
  );
};

const Tooltip = (props) => {
  const {
    children, theme, bottom, ...rest
  } = props;
  const [isHover, changeHover] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <Container {...rest}>
      <IconWrap
        ref={tooltipRef}
        onMouseEnter={() => changeHover(true)}
        onMouseLeave={() => changeHover(false)}
        theme={theme}
      >
        <MdInfo size="1.2em" color="inherit" />
      </IconWrap>
      <TooltipBubble show={isHover} bottom={bottom} theme={theme} tooltipRef={tooltipRef}>
        {children}
      </TooltipBubble>
    </Container>
  );
};

Tooltip.propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  bottom: PropTypes.bool,
};
Tooltip.defaultProps = {
  bottom: false,
};

export default withTheme(Tooltip);
