import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { useDay } from '@datepicker-react/hooks';
import DatepickerContext from './datepickerContext';
import Text from '../../misc/text';

const DayButton = styled.button`
  border: none;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary_500 : 'transparent')};
  transition: all 0.3s;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme, isSelected }) => (isSelected ? undefined : theme.grey_200)};
  }
  cursor: pointer;
  padding: 8px;
  display: flex;
  justify-content: center;
`;
const ButtonText = styled(Text)`
  color: ${({ theme, isSelected }) => (isSelected ? 'white' : undefined)};
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
function Day({ day, date }) {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
  } = useContext(DatepickerContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  if (!day) {
    return <div />;
  }

  return (
    <ButtonContainer>
      <DayButton
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        tabIndex={tabIndex}
        type="button"
        ref={dayRef}
        isSelected={isSelectedStartOrEnd}
      >
        <ButtonText
          isSelected={isSelectedStartOrEnd}
          size="small"
        >
          {day}
        </ButtonText>
      </DayButton>
    </ButtonContainer>
  );
}

export default Day;
