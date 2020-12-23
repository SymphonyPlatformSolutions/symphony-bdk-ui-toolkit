import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import { CalendarBubble } from './theme';
import Footer from './footer';

const PortalBubble = (props) => {
  const {
    activeMonths,
    goToNextMonths,
    goToPreviousMonths,
    value = null,
    isRange = false,
    firstDayOfWeek = 0,
    customWeekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    relatedWidth = 0,
    strategy = '',
    triggerClose = false,
    handleChangeMonth = () => {},
    goToNextYear = () => {},
    goToPreviousYear = () => {},
    textInputDateRef = null,
    setInputValue = () => {},
    hasYearDropdown = false,
    hasMonthDropdown = false,
    isYearPicker = false,
    isMonthPicker = false,
    closeOnClick = false,
    handleCloseOnClick = () => {},
    disabledMonth = () => {},
    disabledYear = () => {},
    handleChangeYear = () => {},
    yearSelected = false,
    monthSelected = false,
    prevYear = null,
    footerNavigationButtons = [],
    onFooterNavigationClick = () => {},
  } = props;
  const isUp = strategy && strategy.includes('ABOVE');
  const isLeft = strategy && strategy.includes('LEFT');
  const bubbleRef = useRef();
  const [initialHeight, setInitialHeight] = useState(0);
  const [outOfBoundsShift, setOutOfBoundsShift] = useState(0);
  const [currHeight, setCurrHeight] = useState(0);

  const [displayMonths, changeDisplayMonths] = useState(!!isMonthPicker);
  const [displayYears, changeDisplayYears] = useState(false);

  const onClickForMonths = () => {
    changeDisplayMonths(true);
    changeDisplayYears(false);
  };

  const onClickForYears = () => {
    changeDisplayYears(true);
    changeDisplayMonths(false);
  };

  const onClickForDays = () => {
    changeDisplayMonths(false);
    changeDisplayYears(false);
  };

  useLayoutEffect(() => {
    if (!initialHeight) {
      setInitialHeight(bubbleRef.current.getBoundingClientRect().height);
    }
    setCurrHeight(bubbleRef.current.getBoundingClientRect().height);
  }, [activeMonths]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (bubbleRef.current) {
        const rect = bubbleRef.current.getBoundingClientRect();
        if (rect && rect.x < 0) {
          setOutOfBoundsShift(12 - rect.x);
        }
      }
    }, 5);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CalendarBubble
      ref={bubbleRef}
      relatedShift={relatedWidth / 2}
      horizontalShift={outOfBoundsShift}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      size={activeMonths.length}
      out={triggerClose}
      isUp={isUp}
      isLeft={isLeft}
      heightDelta={initialHeight ? initialHeight - currHeight : 0}
      displaySmaller={displayMonths || displayYears}
    >
      {displayMonths || displayYears ? (
        <Month
          goToNextMonths={goToNextMonths}
          customWeekdayLabels={customWeekdayLabels}
          goToPreviousMonths={null}
          goToNextYear={goToNextYear}
          goToPreviousYear={goToPreviousYear}
          key={`${activeMonths[0].year}-${activeMonths[0].month}`}
          year={activeMonths[0].year}
          month={activeMonths[0].month}
          singleDay={isRange ? null : value}
          firstDayOfWeek={firstDayOfWeek}
          textInputDateRef={textInputDateRef}
          setInputValue={setInputValue}
          hasYearDropdown={hasYearDropdown}
          hasMonthDropdown={hasMonthDropdown}
          isYearPicker={isYearPicker}
          isMonthPicker={isMonthPicker}
          displayMonths={displayMonths}
          displayYears={displayYears}
          onClickForDays={onClickForDays}
          onClickForMonths={onClickForMonths}
          onClickForYears={onClickForYears}
          handleChangeMonth={handleChangeMonth}
          closeOnClick={closeOnClick}
          handleCloseOnClick={handleCloseOnClick}
          disabledMonth={disabledMonth}
          disabledYear={disabledYear}
          handleChangeYear={handleChangeYear}
          yearSelected={yearSelected}
          monthSelected={monthSelected}
          prevYear={prevYear}
        />
      ) : (
        activeMonths.map((month, index) => (
          <Month
            goToNextMonths={
              index === activeMonths.length - 1 ? goToNextMonths : null
            }
            customWeekdayLabels={customWeekdayLabels}
            goToPreviousMonths={index === 0 ? goToPreviousMonths : null}
            goToNextYear={goToNextYear}
            goToPreviousYear={goToPreviousYear}
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            singleDay={isRange ? null : value}
            firstDayOfWeek={firstDayOfWeek}
            textInputDateRef={textInputDateRef}
            setInputValue={setInputValue}
            hasYearDropdown={hasYearDropdown}
            hasMonthDropdown={hasMonthDropdown}
            isYearPicker={isYearPicker}
            isMonthPicker={isMonthPicker}
            displayMonths={displayMonths}
            displayYears={displayYears}
            onClickForDays={onClickForDays}
            onClickForMonths={onClickForMonths}
            onClickForYears={onClickForYears}
            handleChangeMonth={handleChangeMonth}
            closeOnClick={closeOnClick}
            handleCloseOnClick={handleCloseOnClick}
            disabledMonth={disabledMonth}
            disabledYear={disabledYear}
            handleChangeYear={handleChangeYear}
            yearSelected={yearSelected}
            monthSelected={monthSelected}
            prevYear={prevYear}
          />
        ))
      )}

      {footerNavigationButtons.length > 0 && (
        <Footer
          footerNavigationButtons={footerNavigationButtons}
          onFooterNavigationClick={onFooterNavigationClick}
        />
      )}
    </CalendarBubble>
  );
};

PortalBubble.propTypes = {
  value: PropTypes.object,
  isRange: PropTypes.bool,
  firstDayOfWeek: PropTypes.number,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
  activeMonths: PropTypes.array.isRequired,
  triggerClose: PropTypes.bool,
  goToNextMonths: PropTypes.func.isRequired,
  goToPreviousMonths: PropTypes.func.isRequired,
  relatedWidth: PropTypes.number,
  strategy: PropTypes.string,
  handleChangeMonth: PropTypes.func,
  goToNextYear: PropTypes.func,
  goToPreviousYear: PropTypes.func,
  textInputDateRef: PropTypes.object,
  setInputValue: PropTypes.func,
  hasYearDropdown: PropTypes.bool,
  hasMonthDropdown: PropTypes.bool,
  isYearPicker: PropTypes.bool,
  isMonthPicker: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  handleCloseOnClick: PropTypes.func,
  disabledMonth: PropTypes.func,
  disabledYear: PropTypes.func,
  handleChangeYear: PropTypes.func,
  yearSelected: PropTypes.bool,
  monthSelected: PropTypes.bool,
  prevYear: PropTypes.number,
  footerNavigationButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      daysToSubstract: PropTypes.number.isRequired,
    })
  ),
  onFooterNavigationClick: PropTypes.func,
};

export default PortalBubble;
