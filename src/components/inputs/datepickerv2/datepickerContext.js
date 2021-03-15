import React from 'react';

export const datepickerContextDefaultValue = {
  focusedDate: null,
  error: false,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {},
  hasYearDropdown: () => false,
  isYearPicker: () => false,
  isMonthPicker: () => false,
};

export default React.createContext(datepickerContextDefaultValue);
