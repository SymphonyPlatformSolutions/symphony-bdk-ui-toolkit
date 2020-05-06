import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDatepicker, START_DATE } from '@datepicker-react/hooks';
import Month from './Month';
import DatepickerContext from './datepickerContext';
import InputField from '../input-field';

const CalendarBubble = styled.div`
  background-color: ${({ theme }) => theme.colors.mainbackground};
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grey_200};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Datepicker = (props) => {
  const { value, onChange } = props;
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);

  const inputRef = useRef(null);

  function handleDateChange(data) {
    onChange(data.startDate);
  }

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: value,
    // endDate: state.endDate,
    endDate: null,
    focusedInput: START_DATE,
    onDatesChange: handleDateChange,
    numberOfMonths: 1,
  });

  return (
    <DatepickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
      }}
    >
      <div>
        <InputField
          ref={inputRef}
          onFocus={() => setCalendarIsOpen(true)}
          onBlur={() => setCalendarIsOpen(false)}
          value={value?.toString()}
          placeholder="Choose date..."
        />
      </div>
      {calendarIsOpen ? (
        <CalendarBubble
          onMouseDown={(e) => {
            // debugger;
            e.preventDefault();
          }}
          style={{
            display: 'grid',
            margin: '32px 0 0',
            gridTemplateColumns: `repeat(${activeMonths.length}, 240px)`,
            gridGap: '0 64px',
          }}
        >
          {activeMonths.map((month) => (
            <Month
              goToNextMonths={goToNextMonths}
              goToPreviousMonths={goToPreviousMonths}
              key={`${month.year}-${month.month}`}
              year={month.year}
              month={month.month}
              firstDayOfWeek={firstDayOfWeek}
            />
          ))}
        </CalendarBubble>
      ) : null}
    </DatepickerContext.Provider>
  );
};

export default Datepicker;
