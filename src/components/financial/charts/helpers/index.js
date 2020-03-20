import { format } from 'd3-format';
import { timeFormat, timeParse } from 'd3-time-format';

export const buildDateFormat = (pattern = '%Y-%m-%d') => timeFormat(pattern);
export const buildDateParser = (pattern = '%Y-%m-%d') => timeParse(pattern);
export const buildNumberFormat = (pattern = '.2f') => format(pattern);

export const tooltipContentHelper = ({ currentItem, xAccessor }) => ({
  x: buildDateFormat()(xAccessor(currentItem)),
  y: [
    {
      label: 'open',
      value: currentItem.open && buildNumberFormat()(currentItem.open),
    },
    {
      label: 'high',
      value: currentItem.high && buildNumberFormat()(currentItem.high),
    },
    {
      label: 'low',
      value: currentItem.low && buildNumberFormat()(currentItem.low),
    },
    {
      label: 'close',
      value: currentItem.close && buildNumberFormat()(currentItem.close),
    },
  ].filter(line => line.value),
});
