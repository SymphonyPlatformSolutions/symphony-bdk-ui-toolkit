import React from 'react';
import styled from 'styled-components';
import { useMonth } from '@datepicker-react/hooks';
import { DownChevron } from '../../misc/icons';
import Day from './Day';
import Text from '../../misc/text';

const MonthTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ChangeMonthButton = styled.button`
  margin: 0 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const WeekSeparator = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  margin-top: ${({ margin }) => `${margin}px`};
`;

/* Datepicker hook config constants */
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const weekdayLabelFormat = (date) => WEEKDAYS[date.getDay()];

const Month = (props) => {
  const {
    year,
    month,
    firstDayOfWeek,
    goToNextMonths,
    goToPreviousMonths,
  } = props;
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat,
  });

  return (
    <div>
      <MonthTitleContainer>
        <ChangeMonthButton onClick={goToPreviousMonths} left>
          <DownChevron />
        </ChangeMonthButton>
        <Text size="tiny" isTitle>
          {monthLabel}
        </Text>
        <ChangeMonthButton onClick={goToNextMonths}>
          <DownChevron />
        </ChangeMonthButton>
      </MonthTitleContainer>
      <WeekSeparator margin={8}>
        {weekdayLabels.map((dayLabel, index) => (
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }} key={`${dayLabel}_${index}`}>
            {dayLabel}
          </Text>
        ))}
      </WeekSeparator>
      <WeekSeparator margin={8}>
        {days.map((day) => (
          <Day date={day.date} key={day.dayLabel} day={day.dayLabel} />
        ))}
      </WeekSeparator>
    </div>
  );
};

export default Month;
