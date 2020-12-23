import React from 'react';
import { useMonth } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import {
  Wrapper,
  MonthLabelContainer,
  MonthLabel,
  WeekdayLabel,
  WeekdaysAndDaysContainer,
} from './theme';
import Day from '../day/index';

const Month = ({ year, month, firstDayOfWeek = 0, customWeekdayLabels }) => {
  const weekdayLabelFormat = (date) => customWeekdayLabels[date.getDay()];
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat,
  });

  return (
    <Wrapper>
      <MonthLabelContainer>
        <MonthLabel>{monthLabel}</MonthLabel>
      </MonthLabelContainer>

      <WeekdaysAndDaysContainer>
        {weekdayLabels.map((dayLabel) => (
          <WeekdayLabel key={dayLabel}>{dayLabel}</WeekdayLabel>
        ))}
      </WeekdaysAndDaysContainer>

      <WeekdaysAndDaysContainer>
        {days.map(
          (day) =>
            day.dayLabel && (
              <Day key={day.dayLabel} date={day.date} day={day.dayLabel} />
            )
        )}
      </WeekdaysAndDaysContainer>
    </Wrapper>
  );
};

Month.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  firstDayOfWeek: PropTypes.number,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Month;
