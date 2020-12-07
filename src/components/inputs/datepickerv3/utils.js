import { START_DATE, END_DATE } from '@datepicker-react/hooks';

export const getFocusedInput = (isRange, isStart) => {
  if (!isRange) {
    return START_DATE;
  }

  return isStart ? START_DATE : END_DATE;
};
