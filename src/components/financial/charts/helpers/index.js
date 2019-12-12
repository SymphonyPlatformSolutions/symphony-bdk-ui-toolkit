import { format } from 'd3-format';
import { timeFormat, timeParse } from 'd3-time-format';

export const dateFormat = timeFormat('%Y-%m-%d');
export const timeParser = timeParse('%Y-%m-%d');

export const numberFormat = format('.2f');

export const tooltipContentHelper = ({ currentItem, xAccessor }) => ({
  x: dateFormat(xAccessor(currentItem)),
  y: [
    {
      label: 'open',
      value: currentItem.open && numberFormat(currentItem.open),
    },
    {
      label: 'high',
      value: currentItem.high && numberFormat(currentItem.high),
    },
    {
      label: 'low',
      value: currentItem.low && numberFormat(currentItem.low),
    },
    {
      label: 'close',
      value: currentItem.close && numberFormat(currentItem.close),
    },
  ].filter(line => line.value),
});
