import React, { useState } from 'react';
import { PositioningPortal } from '@codastic/react-positioning-portal';
import { useDatepicker, START_DATE } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import DatepickerContext from './datepickerContext';
import Calendar from './calendar/index';
import NavButtons from './navButtons/index';
import { getFocusedInput, formatDate } from './utils';
import { Wrapper, MultipleCalendarWrapper } from './theme';
import InputField from '../input-field';

const DatepickerV3 = (props) => {
  const {
    isRange,
    numberOfMonths,
    customWeekdayLabels,
    firstDayOfWeek,
    navButtons,
    closeOnSelect,
    errorMessage,
    disabled,
    placeholder,
    size,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRunFadeOut, setShouldRunFadeOut] = useState(false);

  const handleOnOpen = () => {
    setShouldRunFadeOut(false);
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setShouldRunFadeOut(true);

    setTimeout(() => setIsOpen(false), 100);
  };

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

    if (closeOnSelect) {
      // Don't close if it's range and both dates aren't provided.
      if (isRange && (!data.startDate || !data.endDate)) {
        return;
      }

      handleOnClose();
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
    goToPreviousMonths,
    goToNextMonths,
    goToPreviousYear,
    goToNextYear,
    ...otherCalendarProps
  } = useDatepicker({
    startDate: state.startDate,
    endDate: isRange ? state.endDate : null,
    focusedInput: getFocusedInput(isRange, state.focusedInput === START_DATE),
    onDatesChange: handleDateChange,
    // Always keep 1 there, because we don't want the default behaviour of the lib.
    numberOfMonths: 1,
    firstDayOfWeek,
  });

  const handleOnBlur = (e) => {
    if (e.relatedTarget) {
      return;
    }
    handleOnClose();
  };

  return (
    <PositioningPortal
      isOpen={isOpen}
      portalContent={() => (
        <Wrapper isOpen={isOpen} shouldRunFadeOut={shouldRunFadeOut}>
          <MultipleCalendarWrapper numberOfMonths={numberOfMonths}>
            <DatepickerContext.Provider value={otherCalendarProps}>
              <Calendar
                firstDayOfWeek={firstDayOfWeek}
                activeMonths={activeMonths}
                customWeekdayLabels={customWeekdayLabels}
                goToPreviousMonth={goToPreviousMonths}
                goToNextMonth={goToNextMonths}
                goToPreviousYear={() => goToPreviousYear(1)}
                goToNextYear={() => goToNextYear(1)}
              />
            </DatepickerContext.Provider>
          </MultipleCalendarWrapper>

          <NavButtons buttons={navButtons} onNavigate={handleOnNavigate} />
        </Wrapper>
      )}
      onClose={handleOnClose}
    >
      <InputField
        onFocus={handleOnOpen}
        onBlur={(e) => handleOnBlur(e)}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        errorMessage={errorMessage}
        value={formatDate(state, isRange)}
      />
    </PositioningPortal>
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
  closeOnSelect: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'large']),
};

DatepickerV3.defaultProps = {
  numberOfMonths: 1,
  firstDayOfWeek: 0,
  isRange: false,
  customWeekdayLabels: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  navButtons: [],
  closeOnSelect: false,
  errorMessage: null,
  disabled: false,
  placeholder: 'Choose date...',
  size: 'regular',
};

export default DatepickerV3;
