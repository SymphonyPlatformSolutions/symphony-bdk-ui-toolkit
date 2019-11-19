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
for (let i = 0; i < 20; i++) {
  mockData.push(Faker.name.firstName());
}

const SearchWrapper = () => {
  const [currentContent, setCurrentContent] = useState(mockData);
  const filterFunc = (searchTerm) => {
    setCurrentContent(
      mockData.filter((el) => {
        if (el.toLowerCase().includes(searchTerm)) {
          return true;
        }
        return false;
      }),
    );
  };

  return (
    <div>
      <Search
        size="large"
        content={currentContent}
        searchHandler={filterFunc}
        resultHandler={setCurrentContent}
      />
      {currentContent.length ? (
        currentContent.map(el => <Text> - {el}</Text>)
      ) : (
        <Text>No content</Text>
      )}
    </div>
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
