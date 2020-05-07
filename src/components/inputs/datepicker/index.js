import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDatepicker, START_DATE, END_DATE } from '@datepicker-react/hooks';
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
  position: absolute;
  z-index: 10;
  margin-top: 10px;
  transform: translateY(100%);
  bottom: -14px;
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 240px)`};
  grid-gap: 0 40px;

  &:after, &:before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    /* border-color: rgba(136, 183, 213, 0); */
    border-bottom-color: ${({ theme }) => theme.colors.mainbackground};
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-bottom-color: ${({ theme }) => theme.colors.grey_200};
    border-width: 11px;
    margin-left: -11px;
  }
`;
const WholeWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const OwnInput = styled(InputField)`
  color: transparent;
  text-shadow: ${({ theme }) => `0 0 0 ${theme.colors.grey_700}`};
  &::placeholder {
    text-shadow: none;
  }
`;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (date, endDate, isRange) => {
  if (!date) {
    return '';
  }
  if (!isRange) {
    return `${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  }
  let leftPart = 'Start';
  let rightPart = 'End';
  if (date) {
    leftPart = `${
      MONTHS[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()}`;
  }
  if (endDate) {
    rightPart = `${
      MONTHS[endDate.getMonth()]
    } ${endDate.getDate()} ${endDate.getFullYear()}`;
  }
  return `${leftPart} - ${rightPart}`;
};

const Datepicker = (props) => {
  const {
    value,
    endValue,
    onChange,
    numberOfMonths,
    isRange,
    isStart,
    placeholder,
    size,
    dateValueFormatter,
  } = props;
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);

  const inputRef = useRef(null);

  function handleDateChange(data) {
    if (!isRange) {
      onChange(data.startDate);
    } else {
      onChange({
        startDate: data.startDate,
        endDate: data.endDate,
        isStart: data.focusedInput === START_DATE,
      });
    }
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
    endDate: isRange ? endValue : null,
    focusedInput: isStart ? START_DATE : END_DATE,
    onDatesChange: handleDateChange,
    numberOfMonths,
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
      <WholeWrapper>
        <OwnInput
          ref={inputRef}
          onFocus={() => setCalendarIsOpen(true)}
          // onBlur={() => setCalendarIsOpen(false)}
          value={
            dateValueFormatter
              ? dateValueFormatter(value, endValue, isRange)
              : formatDate(value, endValue, isRange)
          }
          onChange={() => {}}
          placeholder={placeholder}
          size={size}
        />
        {calendarIsOpen ? (
          <CalendarBubble
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            size={activeMonths.length}
          >
            {activeMonths.map((month, index) => (
              <Month
                goToNextMonths={
                  index === activeMonths.length - 1 ? goToNextMonths : null
                }
                goToPreviousMonths={index === 0 ? goToPreviousMonths : null}
                key={`${month.year}-${month.month}`}
                year={month.year}
                month={month.month}
                firstDayOfWeek={firstDayOfWeek}
              />
            ))}
          </CalendarBubble>
        ) : null}
      </WholeWrapper>
    </DatepickerContext.Provider>
  );
};

Datepicker.defaultProps = {
  numberOfMonths: 1,
  placeholder: 'Choose date...',
  dateValueFormatter: null,
};
export default Datepicker;
