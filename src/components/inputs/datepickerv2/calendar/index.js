import React from 'react';
import PropTypes from 'prop-types';
import { useDatepicker, START_DATE } from '@datepicker-react/hooks';

import DatepickerContext from '../datepickerContext';
import { getFocusedInput } from '../utils';
import { Wrapper } from './theme';
import Header from '../header/index';

import Month from '../month/index';

const Calendar = (props) => {
  const {
    firstDayOfWeek,
    numberOfMonths,
    customWeekdayLabels,
    isRange,
    closeOnSelect,
    onChange,
    onClose,
    defaultState,
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
    goToNextMonthsByOneMonth,
    goToPreviousMonthsByOneMonth,
    goToPreviousYear,
    goToNextYear,
    ...otherCalendarProps
  } = useDatepicker({
    startDate: defaultState.startDate,
    endDate: isRange ? defaultState.endDate : null,
    focusedInput: getFocusedInput(
      isRange,
      defaultState.focusedInput === START_DATE
    ),
    onDatesChange: handleDateChange,
    numberOfMonths,
    firstDayOfWeek,
  });

  return (
    <>
      <Header
        goToPreviousMonth={goToPreviousMonthsByOneMonth}
        goToNextMonth={goToNextMonthsByOneMonth}
        goToPreviousYear={() => goToPreviousYear(1)}
        goToNextYear={() => goToNextYear(1)}
      />

      <Wrapper activeMonths={activeMonths}>
        <DatepickerContext.Provider value={otherCalendarProps}>
          {activeMonths.map((month) => (
            <Month
              key={`${month.year}-${month.month}`}
              year={month.year}
              month={month.month}
              firstDayOfWeek={firstDayOfWeek}
              customWeekdayLabels={customWeekdayLabels}
            />
          ))}
        </DatepickerContext.Provider>
      </Wrapper>
    </>
  );
};

Calendar.propTypes = {
  firstDayOfWeek: PropTypes.string,
  numberOfMonths: PropTypes.number,
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
};

Calendar.defaultProps = {
  firstDayOfWeek: '',
  numberOfMonths: 1,
  onChange: () => {},
  onClose: () => {},
  isRange: false,
  closeOnSelect: false,
  defaultState: { startDate: null, endDate: null, focusedInput: START_DATE },
};

export default Calendar;
