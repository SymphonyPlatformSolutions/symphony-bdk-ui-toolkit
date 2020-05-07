import React, { useRef, useContext } from 'react';
import { useDay } from '@datepicker-react/hooks';
import DatepickerContext from './datepickerContext';
import {
  ButtonContainer,
  ButtonText,
  DayButton,
} from './theme';

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
        onMouseEnter={onMouseEnter}
        tabIndex={tabIndex}
        type="button"
        ref={dayRef}
        isSelectedStartOrEnd={isSelectedStartOrEnd}
        isSelected={isSelected}
      >
        <ButtonText
          isSelected={isSelectedStartOrEnd || isSelected}
          size="small"
        >
          {parseInt(day, 10)}
        </ButtonText>
      </DayButton>
    </ButtonContainer>
  );
}

export default Day;
