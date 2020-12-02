import React, { useState } from 'react';
import Typehead, { simpleFilter } from '../index';
import Box from '../../../layout/box';

const DATA = [
  'Thing',
  'Stuff',
  'Data',
  'Value',
];

export const TypeheadWrapper = (props) => {
  const [currentData, setCurrentData] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

  return (
    <Box type="secondary">
      <Box horizontal style={{ width: '400px' }}>
        <Typehead
          {...props}
          value={currentValue}
          data={currentData}
          onChange={newValue => {
            setCurrentData(simpleFilter(DATA, newValue));
            setCurrentValue(newValue);
          }}
        />
      </Box>
    </Box>
  );
};
