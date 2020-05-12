import styled, { keyframes } from 'styled-components';
import { transparentize } from 'polished';
import InputField from '../input-field';
import Text from '../../misc/text';

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
  transform: ${({ turnLeft }) => (turnLeft ? 'rotate(90deg)' : 'rotate(-90deg)')};
`;
export const WeekSeparator = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  margin-top: ${({ margin }) => `${margin}px`};
`;
export const TitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_600};
  font-weight: bold;
  white-space: nowrap;
`;
export const WeekdayTextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const WeekdayText = styled(Text)`
  font-weight: bold;
  padding-top: 2px;
  transition: all 0.3s;
`;
export const WeekdayBubble = styled.div`
  height: 26px;
  width: 26px;
  display: flex;
  border-radius: 50%;
  background-color: ${({ hilighted, theme }) => (hilighted ? transparentize(0.6, theme.colors.primary_400) : 'transparent')};
  align-items: center;
  transition: all 0.3s;
  justify-content: center;
`;
const getUpTransform = ({ heightDelta }) => {
  const base = -18 + heightDelta;
  return `${base}px`;
};
const fadeIn = ({ isUp, relatedShift }) => keyframes`
  0% {
    opacity: 0;
    transform: translateX(calc(-50% + ${relatedShift}px)) translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateX(calc(-50% + ${relatedShift}px))translateY(${isUp ? '-18px' : '18px'});
  }
`;
const fadeOut = ({ isUp, relatedShift, heightDelta }) => keyframes`
100% {
  opacity: 0;
  transform: translateX(calc(-50% + ${relatedShift}px)) translateY(0);
}
0% {
  opacity: 1;
  transform: translateX(calc(-50% + ${relatedShift}px))translateY(${isUp ? getUpTransform({ heightDelta }) : '18px'});
}
`;
const getAnimation = ({
  out, isUp, relatedShift, heightDelta,
}) => (out ? fadeOut({ isUp, relatedShift, heightDelta }) : fadeIn({ isUp, relatedShift }));

export const CalendarBubble = styled.div`
  background-color: ${({ theme }) => theme.colors.mainbackground};
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grey_200};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  transform: translateX(calc(-50% + ${({ relatedShift }) => relatedShift}px))
  translateY(${(props) => (props.isUp ? getUpTransform(props) : '18px')});
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, auto)`};
  grid-gap: 0 40px;
  animation: ${(props) => getAnimation(props)} 0.3s;
  transition: all 0.3s;
  &:after,
  &:before {
    bottom: ${({ isUp }) => (isUp ? undefined : '100%')};
    top: ${({ isUp }) => (isUp ? '100%' : undefined)};
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-top-color: ${({ theme, isUp }) => (isUp ? theme.colors.mainbackground : undefined)};
    border-bottom-color: ${({ theme, isUp }) => (isUp ? undefined : theme.colors.mainbackground)};
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-top-color: ${({ theme, isUp }) => (isUp ? theme.colors.grey_200 : undefined)};
    border-bottom-color: ${({ theme, isUp }) => (isUp ? undefined : theme.colors.grey_200)};
    border-width: 11px;
    margin-left: -11px;
  }
`;
export const WholeWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const OwnInput = styled(InputField)`
  color: transparent;
  text-shadow: ${({ theme }) => `0 0 0 ${theme.colors.grey_700}`};
  &::placeholder {
    text-shadow: none;
  }
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
    background-color: ${({ theme, isSelected, isSelectedStartOrEnd }) => (isSelected || isSelectedStartOrEnd ? undefined : theme.colors.grey_200)};
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
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 4px 2px 0 2px;
`;
