import { START_DATE, END_DATE } from '@datepicker-react/hooks';

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dateAreEquals = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return false;
  }
  
  const methods = ['getFullYear', 'getMonth', 'getDate'];
  return methods
    .map((method) => startDate[method]() === endDate[method]())
    .every((booleanValue) => booleanValue);
};

export const getFocusedInput = (isRange, isStart) => {
  if (!isRange) {
    return START_DATE;
  }

  return isStart ? START_DATE : END_DATE;
};

export const formatSingleDate = (date) =>
  `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

export const formatDate = (state, args) => {
  const { isRange } = args;
  const { startDate, endDate } = state;
  if (!startDate) {
    return '';
  }
  if (!isRange) {
    return formatSingleDate(startDate);
  }
  let leftPart = 'Start';
  let rightPart = 'End';

  if (dateAreEquals(startDate, endDate)) {
    return formatSingleDate(startDate);
  }

  if (startDate) {
    leftPart = formatSingleDate(startDate);
  }
  if (endDate) {
    rightPart = formatSingleDate(endDate);
  }
  return `${leftPart} - ${rightPart}`;
};

export const addDaysToDate = (date, daysToAdd) => {
  const currentDays = date.getDate();
  const outputDate = new Date();
  outputDate.setDate(currentDays + daysToAdd);
  return outputDate;
};

export const isNow = (date) => {
  return date && dateAreEquals(date, new Date());
};
