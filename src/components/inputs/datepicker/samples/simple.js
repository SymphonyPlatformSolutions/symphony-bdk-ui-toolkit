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

export const RangeNavigationController = (props) => {
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
      hasFooterNavigation
      numberOfMonths={2}
      footerNavigationButtons={[
        {
          label: 'TODAY',
          daysToSubstract: 0,
        },
        {
          label: 'LAST 7 DAYS',
          daysToSubstract: 7,
        },
        {
          label: 'LAST 30 DAYS',
          daysToSubstract: 30,
        },
      ]}
      {...props}
    />
  );
};

export const RangeNavigation1MonthController = (props) => {
  const [simpleDate, setSimpleDate] = useState(null);
  return (
    <Datepicker
      value={simpleDate}
      onChange={setSimpleDate}
      hasFooterNavigation
      footerNavigationButtons={[{ label: 'TODAY' }]}
      {...props}
    />
  );
};
