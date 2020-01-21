import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Faker from 'faker';
import styled from 'styled-components';
import MultiValueInput from '../index';
import Box from '../../../layout/box';
import Text from '../../../misc/text';
import QuoteProductTag from '../../../financial/quote-product-tag';

const mockData = [];
let nameValue;
for (let i = 0; i < 15; i++) {
  nameValue = Faker.name.firstName();
  mockData.push({
    label: nameValue,
    value: nameValue,
  });
}

export const SearchWrapper = (props) => {
  const [currentdata, setCurrentdata] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

  const endpoints = [
    'http://localhost:9999/food',
    (value, typedTerm) => `http://localhost:9999/ingredients?food=${value[0].value}`,
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
