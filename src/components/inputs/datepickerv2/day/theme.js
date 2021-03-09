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

  return 'inherit';
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

const generateDotForNow = (props) => {
  if (!props.isNow) {
    return '';
  }

  return `
    content: "";
    position: absolute;
    bottom: 2px;
    width: ${CURRENT_DAY_DOT_SIZE}px;
    height: ${CURRENT_DAY_DOT_SIZE}px;
    background-color: ${getColorOfDayButton(props)};
    border-radius: 25px;
  `;
};

const BaseDayButton = styled.button`
  position: relative;
  width: 24px;
  height: 28px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Segoe UI;
  font-size: 12px;
  line-height: 16px;
  transition: all 0.1s;
  border: 2px solid transparent;
  background-color: ${getBackgroundColorOfDayButton};
  &:after {
    ${generateDotForNow}
  }
`

export const DayButton = styled(BaseDayButton)`
  color: ${getColorOfDayButton};
  border-radius: ${getBorderRadius};
  cursor: pointer;
  :hover {
    border-color: ${({ theme }) => theme.colors.primary_default};
    border-radius: 2px;
  }
`;

export const DayButtonDisabled = styled(BaseDayButton)`
  color: ${({ theme }) => theme.colors.graphite}
  text-decoration: line-through;
`;
