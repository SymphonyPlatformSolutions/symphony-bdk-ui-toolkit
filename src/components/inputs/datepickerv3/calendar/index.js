import React from 'react';
import PropTypes from 'prop-types';

import Month from '../month/index';

const Calendar = (props) => {
  const {
    firstDayOfWeek,
    activeMonths,
    goToPreviousMonths,
    goToNextMonths,
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
            goToPreviousMonths={goToPreviousMonths}
            goToNextMonths={goToNextMonths}
            customWeekdayLabels={customWeekdayLabels}
          />
        ))}
      </div>
    </>
  );
};

Calendar.propTypes = {
  firstDayOfWeek: PropTypes.string,
  activeMonths: PropTypes.number,
  goToPreviousMonths: PropTypes.func,
  goToNextMonths: PropTypes.func,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Calendar.defaultProps = {
  firstDayOfWeek: '',
  activeMonths: 1,
  goToPreviousMonths: () => {},
  goToNextMonths: () => {},
};

export default Calendar;
