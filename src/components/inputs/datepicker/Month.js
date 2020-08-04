import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMonth } from '@datepicker-react/hooks';
import { DownChevron } from '../../misc/icons';
import Day from './Day';
import MonthA from './MonthA';
import Year from './Year';
import {
  MonthTitleContainer,
  ChangeMonthButton,
  TitleText,
  WeekSeparator,
  WeekdayBubble,
  WeekdayTextWrapper,
  WeekdayText,
  YearDropdown,
  MonthDropdown,
} from './theme';

const months = [
  { value: 0, label: 'Jan' },
  { value: 1, label: 'Feb' },
  { value: 2, label: 'Mar' },
  { value: 3, label: 'Apr' },
  { value: 4, label: 'May' },
  { value: 5, label: 'Jun' },
  { value: 6, label: 'Jul' },
  { value: 7, label: 'Aug' },
  { value: 8, label: 'Sep' },
  { value: 9, label: 'Oct' },
  { value: 10, label: 'Nov' },
  { value: 11, label: 'Dec' },
];

export const YEAR_SELECTOR_ID = 'sdateselect';

const Month = (props) => {
  const {
    year,
    month,
    firstDayOfWeek,
    goToNextMonths,
    goToPreviousMonths,
    goToNextYear,
    goToPreviousYear,
    singleDay,
    customWeekdayLabels,
    textInputDateRef,
    hasYearDropdown,
    hasMonthDropdown,
    isYearPicker,
    displayMonths,
    displayYears,
    onClickForDays,
    onClickForMonths,
    onClickForYears,
    handleChangeMonth,
  } = props;

  const weekdayLabelFormat = (date) => customWeekdayLabels[date.getDay()];
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat,
  });

  const onDropdownBlur = () => {
    textInputDateRef.current.focus();
  };

  const years = [];
  for (let i = year - 5; i <= year + 6; i += 1) {
    years.push({ label: i.toString(), value: i });
  }

  const YearDropdownHandler = () => {
    const currYear = { label: year.toString(), value: year };

    const [chosenYear, changeChosenYear] = useState(currYear);

    const onYearChange = (y) => {
      changeChosenYear(y);
      const changeInYears = Math.abs(year - y.value);
      if (year > y.value) {
        goToPreviousYear(changeInYears);
      } else {
        goToNextYear(changeInYears);
      }
      onDropdownBlur();
    };

    return (
      <YearDropdown
        inputId={YEAR_SELECTOR_ID}
        label=""
        value={chosenYear}
        options={years}
        onChange={onYearChange}
        onBlur={onDropdownBlur}
      />
    );
  };

  const MonthDropdownHandler = () => {
    const currMonth = { label: months[month].label, value: month };

    const [chosenMonth, changeChosenMonth] = useState(currMonth);

    const onMonthChange = (m) => {
      changeChosenMonth(m);
      handleChangeMonth(m.value, year);
      onDropdownBlur();
    };

    return (
      <MonthDropdown
        inputId={YEAR_SELECTOR_ID}
        label=""
        value={chosenMonth}
        options={months}
        onChange={onMonthChange}
        onBlur={onDropdownBlur}
      />
    );
  };

  const getSelectedIndex = () => {
    if (!singleDay) {
      return -1;
    }
    if (singleDay.getMonth() !== month) {
      return -1;
    }
    if (singleDay.getDay() >= firstDayOfWeek) {
      return singleDay.getDay() - firstDayOfWeek;
    }
    return 7 - (firstDayOfWeek - singleDay.getDay());
  };

  const goForwardOneYear = () => {
    goToNextYear(1);
  };

  const goBackOneYear = () => {
    goToPreviousYear(1);
  };

  const goForwardOneDecade = () => {
    goToNextYear(10);
  };

  const goBackOneDecade = () => {
    goToPreviousYear(10);
  };

  const onYearSelect = (y) => {
    const changeInYears = Math.abs(year - y);
    if (year > y) {
      goToPreviousYear(changeInYears);
    } else {
      goToNextYear(changeInYears);
    }
    onClickForMonths();
  };

  const onMonthSelect = (m) => {
    handleChangeMonth(m, year);
    onClickForDays();
  };

  if (isYearPicker) {
    if (displayMonths) {
      return (
        <div>
          <MonthTitleContainer>
            <ChangeMonthButton
              onClick={goBackOneYear}
              show
              turnLeft
            >
              <DownChevron size={10} />
            </ChangeMonthButton>
            <TitleText onClick={onClickForYears}>{year}</TitleText>
            <ChangeMonthButton onClick={goForwardOneYear} show>
              <DownChevron size={10} />
            </ChangeMonthButton>
          </MonthTitleContainer>
          <WeekSeparator marginTop={8} displayFours>
            {months.map((m) => (
              <MonthA
                label={m.label}
                value={m.value}
                key={`${m.value}-${year}`}
                year={year}
                onClick={onMonthSelect}
              />
            ))}
          </WeekSeparator>
        </div>
      );
    }

    if (displayYears) {
      return (
        <div>
          <MonthTitleContainer>
            <ChangeMonthButton
              onClick={goBackOneDecade}
              show
              turnLeft
            >
              <DownChevron size={10} />
            </ChangeMonthButton>
            <TitleText>Select a year</TitleText>
            <ChangeMonthButton onClick={goForwardOneDecade} show>
              <DownChevron size={10} />
            </ChangeMonthButton>
          </MonthTitleContainer>
          <WeekSeparator marginTop={8} displayFours>
            {years.map((y) => (
              <Year
                key={y.value}
                year={y.value}
                onClick={onYearSelect}
              />
            ))}
          </WeekSeparator>
        </div>
      );
    }

    return (
      <div>
        <MonthTitleContainer>
          <ChangeMonthButton
            onClick={goToPreviousMonths}
            show={!!goToPreviousMonths}
            turnLeft
          >
            <DownChevron size={12} />
          </ChangeMonthButton>
          <TitleText onClick={onClickForMonths}>{monthLabel}</TitleText>
          <ChangeMonthButton onClick={goToNextMonths} show={!!goToNextMonths}>
            <DownChevron size={12} />
          </ChangeMonthButton>
        </MonthTitleContainer>
        <WeekSeparator marginTop={8}>
          {weekdayLabels.map((dayLabel, index) => (
            <WeekdayTextWrapper key={`${dayLabel}_${index}`}>
              <WeekdayBubble hilighted={getSelectedIndex() === index}>
                <WeekdayText>{dayLabel}</WeekdayText>
              </WeekdayBubble>
            </WeekdayTextWrapper>
          ))}
        </WeekSeparator>
        <WeekSeparator marginTop={1}>
          {days.map((day, index) => (
            <Day
              date={day.date}
              key={`${monthLabel}-${index}`}
              day={day.dayLabel}
            />
          ))}
        </WeekSeparator>
      </div>
    );
  }

  return (
    <div>
      <MonthTitleContainer>
        <ChangeMonthButton
          onClick={goToPreviousMonths}
          show={!!goToPreviousMonths}
          turnLeft
        >
          <DownChevron size={12} />
        </ChangeMonthButton>
        {hasMonthDropdown ? <MonthDropdownHandler /> : '' }
        <TitleText>
          {hasYearDropdown ? months[month].label : (hasMonthDropdown ? year : monthLabel)}
        </TitleText>
        {hasYearDropdown ? <YearDropdownHandler /> : '' }
        <ChangeMonthButton onClick={goToNextMonths} show={!!goToNextMonths}>
          <DownChevron size={12} />
        </ChangeMonthButton>
      </MonthTitleContainer>
      <WeekSeparator marginTop={8}>
        {weekdayLabels.map((dayLabel, index) => (
          <WeekdayTextWrapper key={`${dayLabel}_${index}`}>
            <WeekdayBubble hilighted={getSelectedIndex() === index}>
              <WeekdayText>{dayLabel}</WeekdayText>
            </WeekdayBubble>
          </WeekdayTextWrapper>
        ))}
      </WeekSeparator>
      <WeekSeparator marginTop={1}>
        {days.map((day, index) => (
          <Day
            date={day.date}
            key={`${monthLabel}-${index}`}
            day={day.dayLabel}
          />
        ))}
      </WeekSeparator>
    </div>
  );
};

Month.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
  goToNextMonths: PropTypes.func,
  goToPreviousMonths: PropTypes.func,
  goToNextYear: PropTypes.func,
  goToPreviousYear: PropTypes.func,
  singleDay: PropTypes.instanceOf(Date),
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
  textInputDateRef: PropTypes.object,
  hasMonthDropdown: PropTypes.bool,
  hasYearDropdown: PropTypes.bool,
  isYearPicker: PropTypes.bool,
  displayMonths: PropTypes.bool,
  displayYears: PropTypes.bool,
  onClickForDays: PropTypes.func,
  onClickForMonths: PropTypes.func,
  onClickForYears: PropTypes.func,
  handleChangeMonth: PropTypes.func,
};

Month.defaultProps = {
  singleDay: null,
  customWeekdayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToNextMonths: null,
  goToPreviousMonths: null,
  goToNextYear: null,
  goToPreviousYear: null,
  textInputDateRef: null,
  hasYearDropdown: false,
  hasMonthDropdown: false,
  isYearPicker: false,
  displayMonths: false,
  displayYears: false,
  onClickForDays: () => {},
  onClickForMonths: () => {},
  onClickForYears: () => {},
  handleChangeMonth: () => {},
};

export default Month;
