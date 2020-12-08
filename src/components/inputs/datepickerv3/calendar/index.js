import React from 'react';
import PropTypes from 'prop-types';
import { useDatepicker, START_DATE } from '@datepicker-react/hooks';

import DatepickerContext from '../datepickerContext';
import { getFocusedInput } from '../utils';
import { Wrapper } from './theme';

import Month from '../month/index';

const Calendar = (props) => {
  const {
    firstDayOfWeek,
    customWeekdayLabels,
    isRange,
    closeOnSelect,
    onChange,
    onClose,
    defaultState,
    forcedFocusedInput,
  } = props;

  const handleDateChange = (data) => {
    let newData = data;

    if (!data.focusedInput) {
      newData = { ...data, focusedInput: START_DATE };
    }

    onChange(newData);

    if (closeOnSelect) {
      // Don't close if it's range and both dates aren't provided.
      if (isRange && (!newData.startDate || !newData.endDate)) {
        return;
      }

      onClose();
    }
  };

  const {
    activeMonths,
    goToPreviousMonths,
    goToNextMonths,
    goToPreviousYear,
    goToNextYear,
    ...otherCalendarProps
  } = useDatepicker({
    startDate: defaultState.startDate,
    endDate: isRange ? defaultState.endDate : null,
    focusedInput:
      forcedFocusedInput ||
      getFocusedInput(isRange, defaultState.focusedInput === START_DATE),

    onDatesChange: handleDateChange,
    // Always keep 1 there, because we don't want the default behaviour of the lib.
    numberOfMonths: 1,
    firstDayOfWeek,
  });

  return (
    <Wrapper activeMonths={activeMonths}>
      <DatepickerContext.Provider value={otherCalendarProps}>
        <Month
          key={`${activeMonths[0].year}-${activeMonths[0].month}`}
          year={activeMonths[0].year}
          month={activeMonths[0].month}
          firstDayOfWeek={firstDayOfWeek}
          customWeekdayLabels={customWeekdayLabels}
          goToPreviousMonth={goToPreviousMonths}
          goToNextMonth={goToNextMonths}
          goToPreviousYear={() => goToPreviousYear(1)}
          goToNextYear={() => goToNextYear(1)}
        />
      </DatepickerContext.Provider>
    </Wrapper>
  );
};

Calendar.propTypes = {
  firstDayOfWeek: PropTypes.string,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  isRange: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  defaultState: PropTypes.shape({
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    focusedInput: PropTypes.string,
  }),
  forcedFocusedInput: PropTypes.string,
};

Calendar.defaultProps = {
  firstDayOfWeek: '',
  onChange: () => {},
  onClose: () => {},
  isRange: false,
  closeOnSelect: false,
  defaultState: { startDate: null, endDate: null, focusedInput: START_DATE },
  forcedFocusedInput: null,
};

export default Calendar;
