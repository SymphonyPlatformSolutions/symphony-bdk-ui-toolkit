import styled from 'styled-components';
import Text from '../text';

export const PROGRESS_BUTTON_SIZE = 28;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  position: static;
`;
export const ProgressButton = styled.div`
    width: ${() => PROGRESS_BUTTON_SIZE}px;
    height: ${() => PROGRESS_BUTTON_SIZE}px;
    border-radius: 50%;
    transition: background-color 0.4s cubic-bezier(1,.02,.41,.37);
    background-color: ${({ theme, activated }) => (activated ? theme.colors.primary_500 : theme.colors.grey_300)};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
`;
export const ButtonRing = styled.div`
  width: ${({ show }) => (show ? PROGRESS_BUTTON_SIZE + 4 : 0)}px;
  height: ${({ show }) => (show ? PROGRESS_BUTTON_SIZE + 4 : 0)}px;
  transition: all 0.3s cubic-bezier(1,.02,.41,.37);
  background-color: ${({ theme }) => theme.colors.mainbackground};
  border: solid 2px ${({ theme }) => theme.colors.primary_500};
  border-radius: 50%;
  z-index: 2;
  position: absolute;
`;
export const ButtonText = styled(Text)`
  color: white;
`;
export const RingAndButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
export const BarAndButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};;
  position: static;
  z-index: ${({ index }) => index + 1};
`;
export const ProgressBar = styled.div`
  height: ${({ horizontal, length }) => (horizontal ? 2 : length)}px;
  width: ${({ horizontal, length }) => (horizontal ? length : 2)}px;
  background-color: ${({ theme }) => theme.colors.grey_300};
  z-index: 1;
  position: relative;
  &::after {
    z-index: 1;
    transition: all 0.3s ease;
    content: " ";
    width: ${({ length, show, horizontal }) => (horizontal ? (show ? length : '0') : 2)}px;
    height: ${({ length, show, horizontal }) => (horizontal ? 2 : (show ? length : '0'))}px;
    background-color: ${({ theme }) => theme.colors.primary_500};
    display: block;
  }
`;
