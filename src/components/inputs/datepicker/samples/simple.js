import React, { useState } from 'react';
import Datepicker from '..';

export const DatepickerController = (props) => {
  const [simpleDate, setSimpleDate] = useState(null);

  const additionalProps = {
    minBookingDate: new Date(),
  };

  return (
    <Datepicker
      value={simpleDate}
      onChange={setSimpleDate}
      {...props}
      datepickerProps={additionalProps}
    />
  );
};

export const RangeController = (props) => {
  const [currDate, setCurrDate] = useState({
    startDate: null,
    endDate: null,
    isStart: true,
  });
  return (
    <Datepicker
      value={currDate.startDate}
      endValue={currDate.endDate}
      isStart={currDate.isStart}
      onChange={setCurrDate}
      isRange
      {...props}
    />
  );
};
