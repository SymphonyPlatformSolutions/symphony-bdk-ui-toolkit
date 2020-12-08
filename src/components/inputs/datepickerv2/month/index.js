import React from 'react';
import { useMonth } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import {
  MonthLabelContainer,
  MonthLabel,
  WeekdayLabel,
  WeekdaysAndDaysContainer,
} from './theme';
import Day from '../day/index';

const Month = ({ year, month, firstDayOfWeek, customWeekdayLabels }) => {
  const weekdayLabelFormat = (date) => customWeekdayLabels[date.getDay()];
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat,
  });

  return (
    <div>
      <MonthLabelContainer>
        <MonthLabel>{monthLabel}</MonthLabel>
      </MonthLabelContainer>

      <WeekdaysAndDaysContainer>
        {weekdayLabels.map((dayLabel) => (
          <WeekdayLabel key={dayLabel}>{dayLabel}</WeekdayLabel>
        ))}
      </WeekdaysAndDaysContainer>

      <WeekdaysAndDaysContainer>
        {days.map((day) => (
          <Day key={day.dayLabel} date={day.date} day={day.dayLabel} />
        ))}
      </WeekdaysAndDaysContainer>
    </div>
  );
};

Month.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  firstDayOfWeek: PropTypes.number,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Month.defaultProps = {
  firstDayOfWeek: 0,
};

export default Month;
