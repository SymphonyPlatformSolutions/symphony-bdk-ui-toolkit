import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 16px 0;
`;

export const MonthLabelContainer = styled.div`
  text-align: center;
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

const getTransformForButton = ({ turnLeft, reverse, keepOrientation }) => {
  if (keepOrientation) {
    return '';
  }

  if (reverse) {
    return 'rotate(180deg)';
  }

  return turnLeft ? 'rotate(90deg)' : 'rotate(-90deg)';
};

export const ChevronButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: ${getTransformForButton};
`;
