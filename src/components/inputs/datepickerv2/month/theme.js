import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 10px;
`;

export const MonthLabelContainer = styled.div`
  text-align: center;
  margin: 15px 0;
`;

export const MonthLabel = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: #17181b;
  text-transform: uppercase;
`;

export const WeekdayLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px; // should be the same as DayButton.
  height: 24px;
  font-family: Segoe UI;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-align: center;
  color: #17181b;
  text-transform: uppercase;
`;

export const WeekdaysAndDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 24px);
  justify-content: center;
`;
