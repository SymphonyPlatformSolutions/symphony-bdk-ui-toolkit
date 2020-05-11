import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDatepicker, START_DATE, END_DATE } from '@datepicker-react/hooks';
import Month from './Month';
import DatepickerContext from './datepickerContext';
import { WholeWrapper, OwnInput, CalendarBubble } from './theme';
import VerticalPositioner from './positioner';

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

const CALENDAR_HEIGHT = 300;

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
    firstDayOfWeek,
    datepickerProps,
    errorMessage,
    disabled,
    ...rest
  } = props;
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [triggerClose, setTriggerClose] = useState(false);

  const inputRef = useRef(null);
  const divRef = useRef(null);

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

  const getFocused = () => {
    if (!isRange) {
      return START_DATE;
    }
    return isStart ? START_DATE : END_DATE;
  };

  const {
    // firstDayOfWeek,
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
    focusedInput: getFocused(),
    onDatesChange: handleDateChange,
    numberOfMonths,
    firstDayOfWeek,
    ...datepickerProps,
  });

  const closeCalendar = () => {
    setTriggerClose(true);
    setTimeout(() => {
      setCalendarIsOpen(false);
      setTriggerClose(false);
    }, 300);
  };

  // // HMMM USE THIS
  // console.log(divRef?.current?.getBoundingClientRect());

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
      <WholeWrapper ref={divRef} {...rest}>
        <OwnInput
          ref={inputRef}
          onFocus={() => setCalendarIsOpen(true)}
          onBlur={() => closeCalendar()}
          value={
            dateValueFormatter
              ? dateValueFormatter(value, endValue, isRange)
              : formatDate(value, endValue, isRange)
          }
          onChange={() => {}}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          errorMessage={errorMessage}
          inputState={errorMessage ? 'error' : 'initial'}
        />
        <VerticalPositioner anchorRef={divRef} flyOutSize={CALENDAR_HEIGHT}>
          {calendarIsOpen && !disabled ? (
            <CalendarBubble
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              size={activeMonths.length}
              out={triggerClose}
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
                  singleDay={!isRange && value}
                  firstDayOfWeek={firstDayOfWeek}
                />
              ))}
            </CalendarBubble>
          ) : null}
        </VerticalPositioner>
      </WholeWrapper>
    </DatepickerContext.Provider>
  );
};

Datepicker.propTypes = {
  value: PropTypes.object,
  endValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  numberOfMonths: PropTypes.number,
  isRange: PropTypes.bool,
  isStart: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'large']),
  dateValueFormatter: PropTypes.func,
  firstDayOfWeek: PropTypes.number,
  datepickerProps: PropTypes.object,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

Datepicker.defaultProps = {
  value: null,
  endValue: null,
  isRange: false,
  isStart: true,
  size: 'regular',
  numberOfMonths: 1,
  placeholder: 'Choose date...',
  dateValueFormatter: null,
  firstDayOfWeek: 0,
  datepickerProps: {},
  errorMessage: null,
  disabled: false,
};

export default Datepicker;
