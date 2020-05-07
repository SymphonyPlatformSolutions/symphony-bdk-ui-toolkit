import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { useDay } from '@datepicker-react/hooks';
import DatepickerContext from './datepickerContext';
import Text from '../../misc/text';

const getButtonColor = ({ theme, isSelectedStartOrEnd, isSelected }) => {
  if (isSelectedStartOrEnd) {
    return theme.colors.primary_700;
  }
  if (isSelected) {
    return theme.colors.primary_400;
  }
  return 'transparent';
};

const DayButton = styled.button`
  border: none;
  background-color: ${(props) => getButtonColor(props)};
  transition: all 0.3s;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme, isSelected }) => (isSelected ? undefined : theme.colors.grey_200)};
  }
  cursor: pointer;
  padding: 8px;
  display: flex;
  justify-content: center;
`;
const ButtonText = styled(Text)`
  color: ${({ theme, isSelected }) => (isSelected ? 'white' : undefined)};
  justify-content: center;
  width: 2ch;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 5px;
`;
function Day({ day, date }) {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
  } = useContext(DatepickerContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  if (!day) {
    return <div />;
  }

  return (
    <ButtonContainer>
      <DayButton
        onClick={onClick}
        // onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        tabIndex={tabIndex}
        type="button"
        ref={dayRef}
        isSelectedStartOrEnd={isSelectedStartOrEnd}
        isSelected={isSelected}
      >
        <ButtonText
          isSelected={isSelectedStartOrEnd || isSelected}
          size="small"
        >
          {parseInt(day, 10)}
        </ButtonText>
      </DayButton>
    </ButtonContainer>
  );
}

export default Day;
