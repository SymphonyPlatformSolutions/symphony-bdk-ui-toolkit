import styled, { keyframes } from 'styled-components';
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

  background: ${({ theme }) => theme.colors.background};
  transition: opacity 0.2s linear;

  border-radius: 8px;

  * {
    font-family: 'SymphonyLato', 'Lato', 'Segoe UI', 'Helvetica Neue', 'Verdana',
      'Arial', sans-serif !important;
  }

  animation: ${getFadeInOrOutAnimation} 0.3s;
  animation-fill-mode: forwards;

  box-shadow: 0px 24px 48px rgba(9, 10, 11, 0.24),
    0px 4px 8px rgba(9, 10, 11, 0.16);

  z-index: 999;
`;

export const MultipleCalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.graphite_minus_72};
  border-radius: 4px;
  transition: all 0.3s;

  * {
    transition: all 0.3s;
    border: none !important;
  }
`;

export const InputIcon = styled.div`
  width: 16px;
  height: 16px;
  padding: 6px 8px;
  background-color: transparent;
`;

export const CustomInputField = styled(InputField)`
  color: ${({ theme }) => theme.colors.main};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 12px;
  margin-right: 3px;
  border-radius: 2px;
  padding: 4px 12px;
  min-width: 150px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.graphite_minus_24};
  }
`;
