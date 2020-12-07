import styled, { keyframes } from 'styled-components';

const WRAPPER_TRANSLATE_X = -25;

/**
 * ANIMATION
 */
const fadeIn = () => keyframes`
  0% {
    opacity: 0;
    transform: translateY(-25px) translateX(${WRAPPER_TRANSLATE_X}px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(${WRAPPER_TRANSLATE_X}px);
  }
`;

const fadeOut = () => keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) translateX(${WRAPPER_TRANSLATE_X}px);
  }
  100% {
    opacity: 0;
    transform: translateY(-25px) translateX(${WRAPPER_TRANSLATE_X}px);
  }
`;

const getFadeInOrOutAnimation = ({ isOpen, shouldRunFadeOut }) => {
  if (shouldRunFadeOut) {
    return fadeOut();
  }

  return isOpen ? fadeIn() : fadeOut();
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  background: #fff;
  transition: opacity 0.2s linear;

  transform: translateX(${WRAPPER_TRANSLATE_X}px);
  border-radius: 8px;

  * {
    font-family: 'SymphonyLato', 'Lato', 'Segoe UI', 'Helvetica Neue', 'Verdana',
      'Arial', sans-serif !important;
  }

  animation: ${getFadeInOrOutAnimation} 0.3s;
  animation-fill-mode: forwards;
`;

const getMultipleCalendarStyle = ({ numberOfMonths = 1 }) => {
  if (numberOfMonths === 1) {
    return '';
  }

  return `
  width: 400px;
    display: flex;
    flex-direction: row;
  `;
};

export const MultipleCalendarWrapper = styled.div`
  ${getMultipleCalendarStyle}
`;
