import React, { useState } from 'react';
import { PositioningPortal } from '@codastic/react-positioning-portal';
import { useDatepicker, START_DATE } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import DatepickerContext from './datepickerContext';
import Calendar from './calendar/index';
import NavButtons from './navButtons/index';
import { getFocusedInput } from './utils';
import { Wrapper } from './theme';

const DatepickerV3 = (props) => {
  const {
    isRange,
    numberOfMonths,
    customWeekdayLabels,
    firstDayOfWeek,
    navButtons,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClose = () => setIsOpen(false);
  const handleOnOpen = () => setIsOpen(true);

  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  });

  const handleDateChange = (data) => {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE });
    } else {
      setState(data);
    }
  };

  const handleOnNavigate = (daysToAdd = 0) => {
    const tempState = { startDate: new Date(), endDate: new Date() };
    const dateKeyToChange = daysToAdd < 0 ? 'startDate' : 'endDate';

    const currentDateValue = tempState[dateKeyToChange].getDate();
    tempState[dateKeyToChange].setDate(currentDateValue + daysToAdd);

    handleDateChange(tempState);
  };

  const {
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: state.startDate,
    endDate: isRange ? state.endDate : null,
    focusedInput: getFocusedInput(isRange, state.focusedInput === START_DATE),
    onDatesChange: handleDateChange,
    numberOfMonths,
    firstDayOfWeek,
  });

  return (
    <DatepickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
      }}
    >
      <PositioningPortal
        isOpen={isOpen}
        portalContent={() => (
          <Wrapper>
            <Calendar
              firstDayOfWeek={firstDayOfWeek}
              activeMonths={activeMonths}
              customWeekdayLabels={customWeekdayLabels}
              goToPreviousMonths={goToPreviousMonths}
              goToNextMonths={goToNextMonths}
            />

            <NavButtons buttons={navButtons} onNavigate={handleOnNavigate} />
          </Wrapper>
        )}
        onClose={handleOnClose}
      >
        {/* <div>
          <strong>Focused input: </strong>
          {state.focusedInput}
        </div>
        <div>
          <strong>Start date: </strong>
          {state.startDate && state.startDate.toLocaleString()}
        </div>
        <div>
          <strong>End date: </strong>
          {state.endDate && state.endDate.toLocaleString()}
        </div> */}

        <input type="text" onFocus={handleOnOpen} />
      </PositioningPortal>
    </DatepickerContext.Provider>
  );
};

DatepickerV3.propTypes = {
  firstDayOfWeek: PropTypes.number,
  numberOfMonths: PropTypes.number,
  isRange: PropTypes.bool,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
  navButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      daysToAdd: PropTypes.number.isRequired,
    })
  ),
};

DatepickerV3.defaultProps = {
  numberOfMonths: 1,
  firstDayOfWeek: 0,
  isRange: false,
  customWeekdayLabels: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  navButtons: [],
};

export default DatepickerV3;
