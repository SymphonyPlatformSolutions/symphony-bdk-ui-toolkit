import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMonth } from '@datepicker-react/hooks';
import { DownChevron } from '../../misc/icons';
import { Box } from '../../layout/box';
import Day from './Day';
import {
  MonthTitleContainer,
  ChangeMonthButton,
  TitleText,
  WeekSeparator,
  WeekdayBubble,
  WeekdayTextWrapper,
  WeekdayText,
  YearDropdown,
} from './theme';

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

const Month = (props) => {
  const {
    year,
    month,
    firstDayOfWeek,
    goToNextMonths,
    goToPreviousMonths,
    goToNextYear,
    goToPreviousYear,
    singleDay,
    customWeekdayLabels,
    textInputDateRef,
  } = props;

  const weekdayLabelFormat = (date) => customWeekdayLabels[date.getDay()];
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat,
  });

  const years = [];
  for (var i=year-5; i<=year+5; i++) {
    years.push({ label: i.toString(), value: i });
  }

  const currYear = { label: year.toString(), value: year };

  const YearDropdownHandler = () => {
    const [chosen, changeChosen] = useState(currYear);

    const onYearChange = (y) => {
      changeChosen(y.value);
      const changeInYears = Math.abs(year - y.value);
      if (year > y.value) {
        goToPreviousYear(changeInYears);
      } else {
        goToNextYear(changeInYears);
      }
      textInputDateRef.current.focus();
    }

    return (
      <YearDropdown label='' value={chosen} options={years} onChange={onYearChange} />
    );
  };

  const getSelectedIndex = () => {
    if (!singleDay) {
      return -1;
    }
    if (singleDay.getMonth() !== month) {
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
        <TitleText>{months[month]}</TitleText>
        <YearDropdownHandler />
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
  goToNextYear: PropTypes.func,
  goToPreviousYear: PropTypes.func,
  singleDay: PropTypes.instanceOf(Date),
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
};

Month.defaultProps = {
  singleDay: null,
  customWeekdayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToNextMonths: null,
  goToPreviousMonths: null,
  goToNextYear: null,
  goToPreviousYear: null,
};

export default Month;
