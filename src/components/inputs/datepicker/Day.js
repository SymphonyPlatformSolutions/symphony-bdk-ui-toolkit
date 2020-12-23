import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDay } from '@datepicker-react/hooks';
import DatepickerContext from './datepickerContext';
import { ButtonContainer, ButtonText, DayButton } from './theme';

function Day({ 
    day = null,
    date = null
  }) {
  const dayRef = useRef(null);
  const context = useContext(DatepickerContext);
  const {
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
  } = context;
  const {
    isSelected,
    disabledDate,
    isSelectedStartOrEnd,
    onClick,
    tabIndex,
  } = useDay({
    date,
    focusedDate: null,
    isDateFocused: () => false,
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
    <ButtonContainer
      disabled={disabledDate}
      isSelectedStartOrEnd={isSelectedStartOrEnd}
      isSelected={isSelected}
    >
      <DayButton
        onClick={onClick}
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

Day.propTypes = {
  day: PropTypes.string,
  date: PropTypes.object,
};

export default Day;
