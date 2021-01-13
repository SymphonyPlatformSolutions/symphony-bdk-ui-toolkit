import styled from 'styled-components';

const CURRENT_DAY_DOT_SIZE = 3;

const getBackgroundColorOfDayButton = ({
  isSelected,
  isSelectedStartOrEnd,
}) => {
  if (isSelectedStartOrEnd) {
    return '#008EFF';
  }

  if (isSelected) {
    return '#E0F1FF';
  }

  return '#fff';
};

const getColorOfDayButton = ({ isSelected, isSelectedStartOrEnd }) => {
  if (isSelectedStartOrEnd) {
    return '#fff';
  }

  if (isSelected) {
    return '#17181b';
  }

  return '#17181b';
};

const getBorderRadius = ({ isSelectedStartOrEnd }) => {
  return isSelectedStartOrEnd ? '2px' : 0;
};

const generateDotForNow = ({ isNow = false }) => {
  if (!isNow) {
    return '';
  }

  return `
    content: "";
    position: absolute;
    bottom: 2px;
    width: ${CURRENT_DAY_DOT_SIZE}px;
    height: ${CURRENT_DAY_DOT_SIZE}px;
    background-color: #fff;
    border-radius: 25px;
  `;
};

export const DayButton = styled.button`
  position: relative;
  width: 24px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Segoe UI;
  font-size: 12px;
  line-height: 16px;
  color: ${getColorOfDayButton};
  border: none;
  background-color: ${getBackgroundColorOfDayButton};
  border-radius: ${getBorderRadius};
  transition: all 0.1s;
  border: 2px solid transparent;
  cursor: pointer;

  :hover {
    background-color: #fff;
    color: #17181b;
    border-color: #008eff;
    border-radius: 2px;
  }

  &:after {
    ${generateDotForNow}
  }
`;