import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Faker from 'faker';
import Search from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
// import Info from './info.md';

const mockData = [];
for (let i = 0; i < 15; i++) {
  mockData.push({
    label: Faker.name.firstName(),
  });
}

const SearchWrapper = () => {
  const [currentContent, setCurrentContent] = useState([]);
  const filterFunc = (searchTerm) => {
    setCurrentContent(
      mockData.filter((el) => {
        if (el.label.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
        return false;
      }),
    );
  };

  return (
    <Box type="secondary">
      <Box horizontal>
        <Search
          size="large"
          content={currentContent}
          searchHandler={filterFunc}
          resultHandler={setCurrentContent}
        />
      </Box>
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add(
    'Search',
    () => (
      <StoryWrapper p={15}>
        <Box vertical space={20}>
          <Text isTitle>Search</Text>
          <SearchWrapper data={mockData} />
        </Box>
      </StoryWrapper>
    ),
    {
      notes: {
        // markdown: Info,
      },
    },
  );
