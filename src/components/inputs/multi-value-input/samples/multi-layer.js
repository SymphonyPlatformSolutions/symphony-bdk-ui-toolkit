import React, { useState } from 'react';
import MultiValueInput from '../index';
import Box from '../../../layout/box';

export const MultiLayerSearchWrapper = (props) => {
  const [currentdata, setCurrentdata] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

  const endpoints = [
    (value, typedTerm) => `http://localhost:9999/food?query=${encodeURIComponent(typedTerm)}`,
    [
      (value, typedTerm) => `http://localhost:9999/size?query=${encodeURIComponent(typedTerm)}`,
      (value, typedTerm) => `http://localhost:9999/sides?query=${encodeURIComponent(typedTerm)}`,
    ],
    [
      (value, typedTerm) => `http://localhost:9999/sweets?query=${encodeURIComponent(typedTerm)}`,
      (value, typedTerm) => `http://localhost:9999/flavors?query=${encodeURIComponent(typedTerm)}`,
    ],
  ];

  return (
    <Box type="secondary">
      <Box horizontal>
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
