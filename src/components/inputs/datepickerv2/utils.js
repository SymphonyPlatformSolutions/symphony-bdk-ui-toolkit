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

export const getFocusedInput = (isRange, isStart) => {
  if (!isRange) {
    return START_DATE;
  }

  return isStart ? START_DATE : END_DATE;
};

export const formatDate = (state, args) => {
  const { isRange } = args;
  const { startDate, endDate } = state;
  if (!startDate) {
    return '';
  }
  if (!isRange) {
    return `${
      MONTHS[startDate.getMonth()]
    } ${startDate.getDate()} ${startDate.getFullYear()}`;
  }
  let leftPart = 'Start';
  let rightPart = 'End';
  if (startDate) {
    leftPart = `${
      MONTHS[startDate.getMonth()]
    } ${startDate.getDate()} ${startDate.getFullYear()}`;
  }
  if (endDate) {
    rightPart = `${
      MONTHS[endDate.getMonth()]
    } ${endDate.getDate()} ${endDate.getFullYear()}`;
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
  if (!date) {
    return false;
  }

  const now = new Date();
  const methods = ['getFullYear', 'getMonth', 'getDate'];

  const dateAreEquals = methods
    .map((method) => date[method]() === now[method]())
    .every((booleanValue) => booleanValue);

  return dateAreEquals;
};
