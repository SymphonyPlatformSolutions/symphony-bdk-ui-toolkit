import React, { useState } from 'react';
import Datepicker from '..';

export const DatepickerController = (props) => {
  const [currDate, setCurrDate] = useState(null);

  const dateChangeHandler = (newDate) => {
    console.log(newDate);
    setCurrDate(newDate);
  };

  return (<Datepicker value={currDate} onChange={dateChangeHandler} />);
};
