import styled, { keyframes, css } from 'styled-components';
import InputField from '../input-field';

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

  background: #fff;
  transition: opacity 0.2s linear;

  border-radius: 8px;

  * {
    font-family: 'SymphonyLato', 'Lato', 'Segoe UI', 'Helvetica Neue', 'Verdana',
      'Arial', sans-serif !important;
  }

  animation: ${getFadeInOrOutAnimation} 0.3s;
  animation-fill-mode: forwards;
`;

export const MultipleCalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #7c7f86;
  border-radius: 4px;
  transition: all 0.3s;
  padding: 2px 0;

  * {
    transition: all 0.3s;
    border: none !important;
  }

  ${({ isOpen }) =>
    isOpen
      ? css`
          background-color: #008eff;
        `
      : css`
          &:hover {
            background-color: #525760;
          }
        `}
`;

export const InputIcon = styled.div`
  width: 16px;
  height: 16px;
  padding: 8px;
`;

export const CustomInputField = styled(InputField)`
  color:#17181B;
  background-color: #fff;
  font-size: 14px;
  margin-right: 2px;
  border-radius: 4px;

  &::placeholder {
    color: #7c7f86;
  }
`;
