import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Faker from 'faker';
import styled from 'styled-components';
import MultiValueInput from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';
import QuoteProductTag from '../../financial/quote-product-tag';

const mockData = [];
let nameValue;
for (let i = 0; i < 15; i++) {
  nameValue = Faker.name.firstName();
  mockData.push({
    label: nameValue,
    value: nameValue,
  });
}

const SearchWrapper = (props) => {
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

const TagContainer = styled.div`
  margin: 4px 7px 0 0;
`;

const Tag = (props) => {
  const { hasClose, removeHandler, element } = props;

  return (
    <TagContainer>
      <QuoteProductTag
        mainInfo={element.label}
        tagState={hasClose ? 'active' : 'default'}
        onClose={() => removeHandler(element.value)}
      />
    </TagContainer>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add(
    'Multi Value Input',
    () => (
      <StoryWrapper p={15}>
        <Box horizontal p={50}>
          <Box vertical space={20}>
            <Text isTitle>Search</Text>
            <SearchWrapper />
          </Box>
          <Box vertical space={20}>
            <Text isTitle>Custom Tags</Text>
            <SearchWrapper CustomTag={Tag} style={{ margin: '4px 2px' }} />
          </Box>
        </Box>
      </StoryWrapper>
    ),
    {
      notes: {
        markdown: Info,
      },
    },
  );
