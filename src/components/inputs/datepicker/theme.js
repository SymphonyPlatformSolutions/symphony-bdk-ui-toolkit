import styled, { keyframes } from 'styled-components';
import { transparentize } from 'polished';
import Text from '../../misc/text';
import Dropdown from '../dropdown';

export const YearDropdown = styled(Dropdown)`
  width: 100px;
`;

export const MonthDropdown = styled(Dropdown)`
  width: 70px;
`;

export const MonthTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 12px;
`;
export const ChangeMonthButton = styled.button`
  margin: 0 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transform: ${({ turnLeft }) =>
    turnLeft ? 'rotate(90deg)' : 'rotate(-90deg)'};
`;
export const WeekSeparator = styled.div`
  display: grid;
  grid-template-columns: ${({ displayFours }) =>
    displayFours ? 'repeat(4, 1fr)' : 'repeat(7, 1fr)'};
  justify-content: center;
  margin-top: ${({ marginTop }) => `${marginTop}px`};
`;
export const TitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_600};
  font-weight: bold;
  white-space: nowrap;
  &:hover {
    background-color: ${({ theme, isSelected, isSelectedStartOrEnd }) =>
      isSelected || isSelectedStartOrEnd ? undefined : theme.colors.grey_200};
  }
`;
export const WeekdayTextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const WeekdayText = styled(Text)`
  font-weight: bold;
  transition: all 0.3s;
  line-height: 1rem;
  height: 1rem;
  margin-left: 0.1px;
`;
export const WeekdayBubble = styled.div`
  height: 26px;
  width: 26px;
  display: flex;
  border-radius: 50%;
  background-color: ${({ hilighted, theme }) =>
    hilighted ? transparentize(0.6, theme.colors.primary_400) : 'transparent'};
  align-items: center;
  transition: all 0.3s;
  justify-content: center;
`;
const BASE_BUBBLE_TRANSLATE = 18;

const getUpTransform = ({ heightDelta }) => {
  const base = heightDelta - BASE_BUBBLE_TRANSLATE;
  return `${base}px`;
};

const getRightTransform = ({
  relatedShift = 0,
  horizontalShift = 0,
  isLeft = false,
}) => {
  if (isLeft) {
    return 'translateX(-12px)';
  }
  return `translateX(calc(-50% + ${relatedShift + horizontalShift}px))`;
};

const fadeIn = (props) => keyframes`
  0% {
    opacity: 0;
    transform: 
    ${getRightTransform(props)}
     translateY(0);
  }
  100% {
    opacity: 1;
    transform: 
    ${getRightTransform(props)}
    translateY(${
      props.isUp ? `-${BASE_BUBBLE_TRANSLATE}px` : `${BASE_BUBBLE_TRANSLATE}px`
    });
  }
`;
const fadeOut = (props) => keyframes`
100% {
  opacity: 0;
  transform: 
  ${getRightTransform(props)}
   translateY(0);
}
0% {
  opacity: 1;
  transform: 
  ${getRightTransform(props)}
  translateY(${
    props.isUp ? getUpTransform(props) : `${BASE_BUBBLE_TRANSLATE}px`
  });
}
`;
const getAnimation = (props) => {
  if (props.out) {
    return fadeOut(props);
  }
  return fadeIn(props);
};

const getBubbleTipPlacement = ({ isLeft, horizontalShift }) => {
  if (isLeft) {
    return '85%';
  }
  return `calc(50% + (${-horizontalShift}px))`;
};

export const CalendarBubble = styled.div`
  background-color: ${({ theme }) => theme.colors.mainbackground};
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grey_200};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  transform: ${(props) => getRightTransform(props)}
    translateY(
      ${(props) =>
        props.isUp ? getUpTransform(props) : `${BASE_BUBBLE_TRANSLATE}px`}
    );
  display: grid;
  grid-template-columns: ${({ displaySmaller, size }) =>
    displaySmaller ? 'repeat(1, auto)' : `repeat(${size}, auto)`};
  grid-gap: 0 40px;
  animation: ${(props) => getAnimation(props)} 0.3s;
  transition: all 0.3s;
  &:after,
  &:before {
    bottom: ${({ isUp }) => (isUp ? undefined : '100%')};
    top: ${({ isUp }) => (isUp ? '100%' : undefined)};
    left: ${(props) => getBubbleTipPlacement(props)};
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-top-color: ${({ theme, isUp }) =>
      isUp ? theme.colors.mainbackground : undefined};
    border-bottom-color: ${({ theme, isUp }) =>
      isUp ? undefined : theme.colors.mainbackground};
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-top-color: ${({ theme, isUp }) =>
      isUp ? theme.colors.grey_200 : undefined};
    border-bottom-color: ${({ theme, isUp }) =>
      isUp ? undefined : theme.colors.grey_200};
    border-width: 11px;
    margin-left: -11px;
  }
`;
export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const getButtonColor = ({ theme, isSelectedStartOrEnd, isSelected }) => {
  if (isSelectedStartOrEnd) {
    return theme.colors.primary_700;
  }
  if (isSelected) {
    return theme.colors.primary_400;
  }
  return 'transparent';
};

export const DayButton = styled.button`
  border: none;
  background-color: ${(props) => getButtonColor(props)};
  transition: all 0.3s;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme, isSelected, isSelectedStartOrEnd }) =>
      isSelected || isSelectedStartOrEnd ? undefined : theme.colors.grey_200};
  }
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  color: ${({ isSelected }) => (isSelected ? 'white' : undefined)};
  justify-content: center;
  width: 2ch;
`;

export const YearButtonText = styled(ButtonText)`
  width: 4ch;
`;

export const MonthButtonText = styled(ButtonText)`
  width: 3ch;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 4px 2px 0 2px;

  ${({ disabled }) =>
    disabled
      ? `
    opacity: 0.3;
    pointer-events: none;
  `
      : null}
`;

export const MonthButton = styled(DayButton)`
  padding: 16px 20px;
`;

export const YearButton = styled(DayButton)`
  padding: 14px 16px;
`;

export const MonthButtonContainer = styled(ButtonContainer)`
  margin: 8px 4px 0 4px;
`;
