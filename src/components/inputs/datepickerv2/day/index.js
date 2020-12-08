import React, { useRef, useContext } from 'react';
import { useDay } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import DatepickerContext from '../datepickerContext';
import { DayButton } from './theme';
import { isNow } from '../utils';

const Day = ({ day, date }) => {
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

Day.defaultProps = { day: null, date: null };

export default Day;
