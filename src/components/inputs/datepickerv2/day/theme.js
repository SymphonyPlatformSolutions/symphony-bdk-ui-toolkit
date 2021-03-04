import styled from 'styled-components';

const CURRENT_DAY_DOT_SIZE = 3;

const getBackgroundColorOfDayButton = ({
  isSelected,
  isSelectedStartOrEnd,
  theme,
}) => {
  if (isSelectedStartOrEnd) {
    return theme.colors.primary_default;
  }

  if (isSelected) {
    return theme.colors.primary_disabled;
  }

  return theme.colors.input_background;
};

const getColorOfDayButton = ({ isSelectedStartOrEnd, theme }) => {
  if (isSelectedStartOrEnd) {
    return theme.colors.white;
  }

  return theme.colors.btn_graphite_plus_72;
};

const getBorderRadius = ({ isSelectedStartOrEnd }) => {
  return isSelectedStartOrEnd ? '2px' : 0;
};

const generateDotForNow = ({ isNow = false, theme }) => {
  if (!isNow) {
    return '';
  }

  return `
    content: "";
    position: absolute;
    bottom: 2px;
    width: ${CURRENT_DAY_DOT_SIZE}px;
    height: ${CURRENT_DAY_DOT_SIZE}px;
    background-color: ${theme.colors.input_background};
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
    border-color: ${({ theme }) => theme.colors.primary_default};
    border-radius: 2px;
  }

  &:after {
    ${generateDotForNow}
  }
`;
