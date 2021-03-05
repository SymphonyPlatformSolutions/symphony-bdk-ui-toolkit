import React, { useRef, useContext } from 'react';
import { useDay } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import DatepickerContext from '../datepickerContext';
import { DayButton, DayButtonDisabled } from './theme';
import { isNow } from '../utils';

const Day = ({ day = null, date = null }) => {
  const dayRef = useRef(null);
  const currentDayIsNow = isNow(date);
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
    disabledDate
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
    return <></>;
  }

  return disabledDate ? <DayButtonDisabled>{day}</DayButtonDisabled> : (
    <DayButton
      ref={dayRef}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      isSelected={isSelected}
      isSelectedStartOrEnd={isSelectedStartOrEnd}
      isNow={currentDayIsNow}
    >
      {day}
    </DayButton>
  );
};

Day.propTypes = {
  day: PropTypes.string,
  date: PropTypes.any,
};

export default Day;
