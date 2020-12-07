import styled, { keyframes } from 'styled-components';

const WRAPPER_TRANSLATE_X = -25;

/**
 * ANIMATION
 */
const fadeIn = () => keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const fadeOut = () => keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const getFadeInOrOutAnimation = ({ isOpen }) => (isOpen ? fadeIn() : fadeOut());

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
`;
