import React from 'react';
import PropTypes from 'prop-types';
import { useMonth } from '@datepicker-react/hooks';
import { DownChevron } from '../../misc/icons';
import Day from './Day';
import {
  MonthTitleContainer,
  ChangeMonthButton,
  TitleText,
  WeekSeparator,
  WeekdayBubble,
  WeekdayTextWrapper,
  WeekdayText,
} from './theme';

const Month = (props) => {
  const {
    year,
    month,
    firstDayOfWeek,
    goToNextMonths,
    goToPreviousMonths,
    singleDay,
    customWeekdayLabels,
  } = props;

  const months = [
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

  const getSelectedIndex = () => {
    if (!singleMonth) {
      return -1;
    }
    if (singleMonth.getMonth() !== month) {
      return -1;
    }
    if (singleDay.getDay() >= firstDayOfWeek) {
      return singleDay.getDay() - firstDayOfWeek;
    }
    return 7 - (firstDayOfWeek - singleDay.getDay());
  };

  return (
    <div>
      <MonthTitleContainer>
        <ChangeMonthButton
          onClick={goToPreviousMonths}
          show={!!goToPreviousMonths}
          turnLeft
        >
          <DownChevron size={12} />
        </ChangeMonthButton>
        <TitleText>{monthLabel}</TitleText>
        <ChangeMonthButton onClick={goToNextMonths} show={!!goToNextMonths}>
          <DownChevron size={12} />
        </ChangeMonthButton>
      </MonthTitleContainer>
      <WeekSeparator marginTop={8}>
        {weekdayLabels.map((dayLabel, index) => (
          <WeekdayTextWrapper key={`${dayLabel}_${index}`}>
            <WeekdayBubble hilighted={getSelectedIndex() === index}>
              <WeekdayText>{dayLabel}</WeekdayText>
            </WeekdayBubble>
          </WeekdayTextWrapper>
        ))}
      </WeekSeparator>
      <WeekSeparator marginTop={1}>
        {days.map((day, index) => (
          <Day
            date={day.date}
            key={`${monthLabel}-${index}`}
            day={day.dayLabel}
          />
        ))}
      </WeekSeparator>
    </div>
  );
};

Month.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
  goToNextMonths: PropTypes.func,
  goToPreviousMonths: PropTypes.func,
  singleDay: PropTypes.instanceOf(Date),
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
};

Month.defaultProps = {
  singleDay: null,
  customWeekdayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToNextMonths: null,
  goToPreviousMonths: null,
};

export default Month;
