import React, {
  useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useDatepicker, START_DATE, END_DATE } from '@datepicker-react/hooks';
import { PositioningPortal } from '@codastic/react-positioning-portal';
import PortalBubble from './bubble';
import DatepickerContext from './datepickerContext';
import InputField from '../input-field';
import { InputWrapper } from './theme';
import { YEAR_SELECTOR_ID } from './Month';

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

const ENTER_KEY = 13;
const TAB_KEY = 9;

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
    inputState,
    disabled,
    customWeekdayLabels,
    hasYearDropdown,
    hasMonthDropdown,
    isYearPicker,
    isMonthPicker,
    closeOnClick,
    ...rest
  } = props;
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [triggerClose, setTriggerClose] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const divRef = useRef(null);
  const textInputDateRef = useRef();

  const closeCalendar = () => {
    setTriggerClose(true);
    // Reset input to chosen date value
    if (!isMonthPicker) {
      setInputValue(
        dateValueFormatter
          ? dateValueFormatter(value, endValue, isRange)
          : formatDate(value, endValue, isRange),
      );
    }
    setTimeout(() => {
      setCalendarIsOpen(false);
      setTriggerClose(false);
    }, 300);
  };

  const handleCloseOnClick = () => {
    closeCalendar();
    textInputDateRef.current.blur();
  };

  useEffect(() => {
    setInputValue(
      dateValueFormatter
        ? dateValueFormatter(value, endValue, isRange)
        : formatDate(value, endValue, isRange),
    );
  }, [value, endValue, isRange]);

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
    if (closeOnClick) { handleCloseOnClick(); }
  }

  const getFocused = () => {
    if (!isRange) {
      return START_DATE;
    }
    return isStart ? START_DATE : END_DATE;
  };

  const {
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
    goToDate,
    goToNextYear,
    goToPreviousYear,
  } = useDatepicker({
    startDate: value,
    endDate: isRange ? endValue : null,
    focusedInput: getFocused(),
    onDatesChange: handleDateChange,
    numberOfMonths,
    firstDayOfWeek,
    ...datepickerProps,
  });

  const handleChangeMonth = (m, y) => {
    const newDate = new Date();
    newDate.setMonth(m);
    newDate.setDate(15);
    newDate.setFullYear(y);
    goToDate(newDate);
  };

  const specialKeyHandler = ({ keyCode }) => {
    // Enter Key Handler
    if (keyCode === ENTER_KEY) {
      if (!isRange) {
        const inputDate = new Date(inputValue);
        if (inputDate.toString() !== 'Invalid Date') {
          onChange(inputDate);
          onDateFocus(inputDate);
        }
      } else {
        const [inputStart, inputEnd] = inputValue.split('-');
        const inputDateStart = inputStart ? new Date(inputStart) : null;
        const inputDateEnd = inputEnd ? new Date(inputEnd) : null;
        let startDateObject = null;
        let endDateObject = null;
        let newSide = false;
        if (!!inputDateStart && inputDateStart.toString() !== 'Invalid Date') {
          startDateObject = inputDateStart;
        }
        if (!!inputDateEnd && inputDateEnd.toString() !== 'Invalid Date') {
          endDateObject = inputDateEnd;
          newSide = true;
        }
        onChange({
          startDate: startDateObject,
          endDate: endDateObject,
          isStart: newSide,
        });
        onDateFocus(startDateObject || endDateObject);
      }
    } else if (keyCode === TAB_KEY) {
      closeCalendar();
    }
  };

  const handleBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.id === YEAR_SELECTOR_ID) {
      return;
    }
    closeCalendar();
  };

  return (
    <DatepickerContext.Provider
      value={{
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
            goToNextYear={goToNextYear}
            goToPreviousYear={goToPreviousYear}
            firstDayOfWeek={firstDayOfWeek}
            isRange={isRange}
            value={value}
            hasYearDropdown={hasYearDropdown}
            hasMonthDropdown={hasMonthDropdown}
            customWeekdayLabels={customWeekdayLabels}
            textInputDateRef={textInputDateRef}
            setInputValue={setInputValue}
            isYearPicker={isYearPicker}
            isMonthPicker={isMonthPicker}
            handleChangeMonth={handleChangeMonth}
          />
        )}
        portalElement={<div style={{ zIndex: 10 }} />}
      >
        <InputWrapper ref={divRef} {...rest}>
          <InputField
            onKeyDown={specialKeyHandler}
            onFocus={() => setCalendarIsOpen(true)}
            onBlur={(e) => handleBlur(e)}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder={placeholder}
            size={size}
            disabled={disabled}
            errorMessage={errorMessage}
            inputState={inputState}
            ref={textInputDateRef}
          />
        </InputWrapper>
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
  inputState: PropTypes.oneOf(['initial', 'modified', 'error']),
  disabled: PropTypes.bool,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
  hasYearDropdown: PropTypes.bool,
  hasMonthDropdown: PropTypes.bool,
  isYearPicker: PropTypes.bool,
  isMonthPicker: PropTypes.bool,
  closeOnClick: PropTypes.bool,
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
  inputState: 'initial',
  disabled: false,
  customWeekdayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  hasYearDropdown: false,
  hasMonthDropdown: false,
  isYearPicker: false,
  isMonthPicker: false,
  closeOnClick: false,
};

export default Datepicker;
