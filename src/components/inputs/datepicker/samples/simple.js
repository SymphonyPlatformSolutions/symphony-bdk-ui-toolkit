import React, { useState } from 'react';
import Box from '../../../layout/box';
import Datepicker from '..';

export const DatepickerController = (props) => {
  const [currDate, setCurrDate] = useState({
    startDate: null,
    endDate: null,
    isStart: true,
  });

  const dateChangeHandler = (newDate) => {
    setCurrDate(newDate);
  };

  return (
    <Box>
      <Datepicker
        value={currDate.startDate}
        endValue={currDate.endDate}
        isStart={currDate.isStart}
        onChange={dateChangeHandler}
        isRange
      />
    </Box>
  );
};
