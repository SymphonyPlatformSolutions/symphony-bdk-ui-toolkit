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
  margin-top: 8px;
  margin-bottom: 12px;
`;
const ChangeMonthButton = styled.button`
  margin: 0 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transform: ${({ turnLeft }) => (turnLeft ? 'rotate(90deg)' : 'rotate(-90deg)')};
`;
const WeekSeparator = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  margin-top: ${({ margin }) => `${margin}px`};
`;
const TitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_600};
  font-weight: bold;
  white-space: nowrap;
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
        <ChangeMonthButton onClick={goToPreviousMonths} show={!!goToPreviousMonths} turnLeft>
          <DownChevron size={12} />
        </ChangeMonthButton>
        <TitleText>
          {monthLabel}
        </TitleText>
        <ChangeMonthButton onClick={goToNextMonths} show={!!goToNextMonths}>
          <DownChevron size={12} />
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
        {days.map((day, index) => (
          <Day date={day.date} key={`${monthLabel}-${index}`} day={day.dayLabel} />
        ))}
      </WeekSeparator>
    </div>
  );
};

export default Month;
