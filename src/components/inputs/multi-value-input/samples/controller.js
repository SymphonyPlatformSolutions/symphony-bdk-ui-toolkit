import React, { useState } from 'react';
import MultiValueInput from '../index';
import Box from '../../../layout/box';

export const SearchWrapper = (props) => {
  const [currentdata, setCurrentdata] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

  const endpoints = [
    (value, typedTerm) => `http://localhost:9999/food?query=${encodeURIComponent(typedTerm)}`,
    (value, typedTerm) => `http://localhost:9999/ingredients?food=${value[0].value}&query=${encodeURIComponent(typedTerm)}`,
  ];

  return (
    <Box type="secondary">
      <Box horizontal style={{ width: '400px' }}>
        <MultiValueInput
          {...props}
          value={currentValue}
          data={currentdata}
          endpoints={endpoints}
          resultHandler={setCurrentdata}
          itemChooseHandler={newValue => setCurrentValue(newValue)}
        />
      </Box>
    </Box>
  );
};
