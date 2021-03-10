import React, { useEffect, useState, useRef } from 'react';
import { PositioningPortal } from '@codastic/react-positioning-portal';
import { START_DATE } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Calendar from './calendar/index';
import NavButtons from './navButtons/index';
import { formatDate, addDaysToDate } from './utils';
import {
  Wrapper,
  MultipleCalendarWrapper,
  InputWrapper,
  CustomInputField,
  InputIcon,
} from './theme';
import { CalendarIcon } from '../../misc/icons';

const DATEPICKER_ID = 'datepicker-wrapper';
const DEFAULT_STATE = {
  startDate: null,
  endDate: null,
  focusedInput: START_DATE,
};

const DatepickerV2 = (props) => {
  const {
    firstDayOfWeek = 0,
    numberOfMonths = 1,
    isRange = false,
    customWeekdayLabels = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
    navButtons = [],
    closeOnSelect = false,
    errorMessage = null,
    disabled = false,
    placeholder = 'dd/mm/yyyy',
    size = 'regular',
    defaultInitialVisibleMonth = new Date(),
    onDateChange = () => {},
    initialDate = DEFAULT_STATE,
    isDateBlocked,
    theme,
    customInputText,
  } = props;
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRunFadeOut, setShouldRunFadeOut] = useState(false);
  const [initialVisibleMonth, setInitialVisibleMonth] = useState(
    defaultInitialVisibleMonth,
  );
  const [state, setState] = useState(initialDate);

  const handleOnOpen = () => {
    setShouldRunFadeOut(false);
    setIsOpen(true);
  };

  const handleOnClose = () => {
    inputRef.current.blur();
    setShouldRunFadeOut(true);
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleOnDateChange = (dateState, isOnlyEndDate) => {
    if (isOnlyEndDate) {
      const newDate = { ...state, endDate: dateState.startDate };
      setState(newDate);
      onDateChange(newDate);
      return;
    }

    setState(dateState);
    onDateChange(dateState);
  };

  const handleOnBlurModal = (e) => {
    const { currentTarget, relatedTarget } = e;

    // If `relatedTarget` is a child of `currentTarget`, then we don't want to close the modal.
    if (currentTarget.contains(relatedTarget)) {
      currentTarget.focus();
      return;
    }

    handleOnClose();
  };

  const handleOnBlurInput = (e) => {
    const { relatedTarget } = e;
    const relatedTargetIsDatepicker = relatedTarget?.id === DATEPICKER_ID;
    const relatedTargetIsChildOfDatepicker = document
      .getElementById(DATEPICKER_ID)
      .contains(relatedTarget);

    if (relatedTargetIsDatepicker || relatedTargetIsChildOfDatepicker) {
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

    if (closeOnSelect) {
      handleOnClose();
    }

    setState(tempState);
  };

  useEffect(() => {
    if (!state || !state.startDate) {
      return;
    }

    setInitialVisibleMonth(state.startDate);
  }, [state]);

  useEffect(() => {
    setState(initialDate);
  }, [initialDate]);

  return (
    <PositioningPortal
      isOpen={isOpen}
      portalElement={<div onBlur={handleOnBlurModal} style={{ zIndex: 6 }} />}
      portalContent={() => (
        <Wrapper
          id={DATEPICKER_ID}
          isOpen={isOpen}
          shouldRunFadeOut={shouldRunFadeOut}
          // Needed to be able to get this element by using `e.relatedTarget`.
          tabIndex={0}
        >
          <MultipleCalendarWrapper>
            <Calendar
              firstDayOfWeek={firstDayOfWeek}
              numberOfMonths={numberOfMonths}
              customWeekdayLabels={customWeekdayLabels}
              closeOnSelect={closeOnSelect}
              isRange={isRange}
              onChange={handleOnDateChange}
              onClose={handleOnClose}
              defaultState={state}
              initialVisibleMonth={initialVisibleMonth}
              isDateBlocked={isDateBlocked}
            />
          </MultipleCalendarWrapper>

          <NavButtons buttons={navButtons} onNavigate={handleOnNavigate} />
        </Wrapper>
      )}
      onClose={handleOnClose}
    >
      <InputWrapper isOpen={isOpen}>
        <InputIcon>
          <CalendarIcon color={theme.colors.background} />
        </InputIcon>
        <CustomInputField
          ref={inputRef}
          onFocus={handleOnOpen}
          onBlur={handleOnBlurInput}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          errorMessage={errorMessage}
          value={customInputText || formatDate(state, { isRange })}
        />
      </InputWrapper>
    </PositioningPortal>
  );
};

DatepickerV2.propTypes = {
  firstDayOfWeek: PropTypes.number,
  numberOfMonths: PropTypes.number,
  isRange: PropTypes.bool,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
  navButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      daysToAdd: PropTypes.number.isRequired,
    }),
  ),
  initialDate: PropTypes.shape({
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    focusedInput: PropTypes.string.isRequired,
  }),
  closeOnSelect: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'large']),
  defaultInitialVisibleMonth: PropTypes.any,
  onDateChange: PropTypes.func,
  isDateBlocked: PropTypes.func,
  theme: PropTypes.any,
  customInputText: PropTypes.string,
};

export default withTheme(DatepickerV2);
