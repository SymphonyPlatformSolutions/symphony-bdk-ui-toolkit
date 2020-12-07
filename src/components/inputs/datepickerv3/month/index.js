import React from 'react';
import { useMonth } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import {
  Header,
  MonthLabelContainer,
  MonthLabel,
  WeekdayLabel,
  ChevronButton,
} from './theme';
import Day from '../day/index';
import { DownChevron } from '../../../misc/icons';

const CHEVRON_COLOR = '#008EFF';

const Month = ({
  year,
  month,
  firstDayOfWeek,
  goToNextMonths,
  goToPreviousMonths,
  customWeekdayLabels,
}) => {
  const weekdayLabelFormat = (date) => customWeekdayLabels[date.getDay()];
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat,
  });

  return (
    <>
      <Header>
        <ChevronButton type="button" onClick={goToPreviousMonths} show turnLeft>
          <DownChevron size={10} color={CHEVRON_COLOR} />
        </ChevronButton>
        <MonthLabelContainer>
          <MonthLabel>{monthLabel}</MonthLabel>
        </MonthLabelContainer>
        <ChevronButton type="button" onClick={goToNextMonths}>
          <DownChevron size={10} color={CHEVRON_COLOR} />
        </ChevronButton>
      </Header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 24px)',
          justifyContent: 'center',
        }}
      >
        {weekdayLabels.map((dayLabel) => (
          <WeekdayLabel key={dayLabel}>{dayLabel}</WeekdayLabel>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 24px)',
          justifyContent: 'center',
        }}
      >
        {days.map((day) => (
          <Day key={day.dayLabel} date={day.date} day={day.dayLabel} />
        ))}
      </div>
    </>
  );
};

Month.propTypes = {
  firstDayOfWeek: PropTypes.number,
  goToPreviousMonths: PropTypes.func,
  goToNextMonths: PropTypes.func,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Month.defaultProps = {
  firstDayOfWeek: 0,
  goToPreviousMonths: () => {},
  goToNextMonths: () => {},
};

export default Month;
