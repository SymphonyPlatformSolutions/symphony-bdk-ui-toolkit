import React, { useState } from 'react';
import { PositioningPortal } from '@codastic/react-positioning-portal';
import { START_DATE } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';

import Calendar from './calendar/index';
import NavButtons from './navButtons/index';
import { formatDate, addDaysToDate } from './utils';
import { Wrapper, MultipleCalendarWrapper } from './theme';
import InputField from '../input-field';

const DatepickerV3 = (props) => {
  const {
    isRange,
    dual,
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
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  });

  const handleOnOpen = () => {
    setShouldRunFadeOut(false);
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setShouldRunFadeOut(true);
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleOnDateChange = (dateState, isOnlyEndDate) => {
    if (isOnlyEndDate) {
      setState({ ...state, endDate: dateState.startDate });
      return;
    }

    setState(dateState);
  };

  const handleOnBlur = (e) => {
    if (e.relatedTarget) {
      return;
    }
    handleOnClose();
  };

  const handleOnNavigate = (daysToAdd) => {
    const tempState = { ...state };
    const now = new Date();

    // Means "TODAY" button click.
    if (daysToAdd === 0) {
      tempState.startDate = now;
      tempState.endDate = isRange ? now : null;
    } else {
      tempState.startDate = addDaysToDate(now, daysToAdd);
      tempState.endDate = now;
    }

    setState(tempState);
  };

  return (
    <PositioningPortal
      isOpen={isOpen}
      portalContent={() => (
        <Wrapper isOpen={isOpen} shouldRunFadeOut={shouldRunFadeOut}>
          <MultipleCalendarWrapper dual={dual}>
            <Calendar
              firstDayOfWeek={firstDayOfWeek}
              customWeekdayLabels={customWeekdayLabels}
              closeOnSelect={closeOnSelect}
              isRange={dual || isRange}
              onChange={handleOnDateChange}
              onClose={handleOnClose}
              defaultState={state}
              forcedFocusedInput={dual ? START_DATE : null}
            />

            {dual && (
              <Calendar
                firstDayOfWeek={firstDayOfWeek}
                customWeekdayLabels={customWeekdayLabels}
                closeOnSelect={closeOnSelect}
                isRange={dual || isRange}
                onChange={(args) => handleOnDateChange(args, true)}
                onClose={handleOnClose}
                defaultState={state}
                forcedFocusedInput={START_DATE}
              />
            )}
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
        value={formatDate(state, { isRange, dual })}
      />
    </PositioningPortal>
  );
};

DatepickerV3.propTypes = {
  firstDayOfWeek: PropTypes.number,
  dual: PropTypes.bool,
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
  dual: false,
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
