import React from 'react';
import PropTypes from 'prop-types';

import Month from '../month/index';

const Calendar = (props) => {
  const {
    firstDayOfWeek,
    activeMonths,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousYear,
    goToNextYear,
    customWeekdayLabels,
  } = props;

  return (
    <>
      <div
        style={{
          width: 200,
          display: 'grid',
          gridTemplateColumns: `repeat(${activeMonths.length}, 200px)`,
          gridGap: '0 64px',
        }}
      >
        {activeMonths.map((month) => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            firstDayOfWeek={firstDayOfWeek}
            customWeekdayLabels={customWeekdayLabels}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
            goToPreviousYear={goToPreviousYear}
            goToNextYear={goToNextYear}
          />
        ))}
      </div>
    </>
  );
};

Calendar.propTypes = {
  firstDayOfWeek: PropTypes.string,
  activeMonths: PropTypes.number,
  goToPreviousMonth: PropTypes.func,
  goToNextMonth: PropTypes.func,
  goToPreviousYear: PropTypes.func,
  goToNextYear: PropTypes.func,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Calendar.defaultProps = {
  firstDayOfWeek: '',
  activeMonths: 1,
  goToPreviousMonth: () => {},
  goToNextMonth: () => {},
  goToPreviousYear: () => {},
  goToNextYear: () => {},
};

export default Calendar;
