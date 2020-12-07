import React, { useRef, useContext } from 'react';
import { useDay } from '@datepicker-react/hooks';

import DatepickerContext from '../datepickerContext';
import { DayButton } from './theme';

const Day = ({ day, date }) => {
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
    <DayButton
      ref={dayRef}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      isSelected={isSelected}
      isSelectedStartOrEnd={isSelectedStartOrEnd}
    >
      {day}
    </DayButton>
  );
};

export default Day;
