import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useDatepicker,
  START_DATE,
  END_DATE,
  useMonth,
} from '@datepicker-react/hooks';
import { PositioningPortal } from '@codastic/react-positioning-portal';
import Month from './Month';
import DatepickerContext from './datepickerContext';
import { WholeWrapper, OwnInput, CalendarBubble } from './theme';

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

const PortalBubble = (props) => {
  const {
    triggerClose,
    activeMonths,
    goToNextMonths,
    goToPreviousMonths,
    firstDayOfWeek,
    isRange,
    value,
    strategy,
    relatedWidth,
  } = props;
  const isUp = strategy && strategy.includes('ABOVE');
  const bubbleRef = useRef();
  const [initialHeight, setInitialHeight] = useState(0);
  const [currHeight, setCurrHeight] = useState(0);
  useLayoutEffect(() => {
    if (!initialHeight) {
      setInitialHeight(bubbleRef.current.getBoundingClientRect().height);
    }
    setCurrHeight(bubbleRef.current.getBoundingClientRect().height);
  }, [activeMonths]);

  return (
    <CalendarBubble
      ref={bubbleRef}
      relatedShift={relatedWidth / 2}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      size={activeMonths.length}
      out={triggerClose}
      isUp={isUp}
      heightDelta={
        initialHeight
          ? initialHeight - currHeight
          : 0
      }
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
  );
};

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
      <PositioningPortal
        isOpen={calendarIsOpen}
        portalContent={({ relatedWidth, strategy }) => (
          <PortalBubble
            strategy={strategy}
            relatedWidth={relatedWidth}
            triggerClose={triggerClose}
            activeMonths={activeMonths}
            goToNextMonths={goToNextMonths}
            goToPreviousMonths={goToPreviousMonths}
            firstDayOfWeek={firstDayOfWeek}
            isRange={isRange}
            value={value}
          />
        )}
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
        </WholeWrapper>
      </PositioningPortal>
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
