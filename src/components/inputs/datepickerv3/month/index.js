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
import { DownChevron, DoubleChevron } from '../../../misc/icons';

const CHEVRON_COLOR = '#008EFF';

const Month = ({
  year,
  month,
  firstDayOfWeek,
  customWeekdayLabels,
  goToNextMonth,
  goToPreviousMonth,
  goToNextYear,
  goToPreviousYear,
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
        <ChevronButton
          type="button"
          onClick={goToPreviousYear}
          reverse
          marginRight={4}
        >
          <DoubleChevron width={12.5} height={10} />
        </ChevronButton>
        <ChevronButton type="button" onClick={goToPreviousMonth} turnLeft>
          <DownChevron size={10} color={CHEVRON_COLOR} />
        </ChevronButton>
        <MonthLabelContainer>
          <MonthLabel>{monthLabel}</MonthLabel>
        </MonthLabelContainer>
        <ChevronButton type="button" onClick={goToNextMonth}>
          <DownChevron size={10} color={CHEVRON_COLOR} />
        </ChevronButton>
        <ChevronButton
          type="button"
          onClick={goToNextYear}
          keepOrientation
          marginLeft={4}
        >
          <DoubleChevron width={12.5} height={10} />
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
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  firstDayOfWeek: PropTypes.number,
  goToPreviousMonth: PropTypes.func,
  goToNextMonth: PropTypes.func,
  goToPreviousYear: PropTypes.func,
  goToNextYear: PropTypes.func,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Month.defaultProps = {
  firstDayOfWeek: 0,
  goToPreviousMonth: () => {},
  goToNextMonth: () => {},
  goToPreviousYear: () => {},
  goToNextYear: () => {},
};

export default Month;
