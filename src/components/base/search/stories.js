import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Faker from 'faker';
import Axios from 'axios';
import Search from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

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
          content={currentContent}
          searchHandler={filterFunc}
          resultHandler={setCurrentContent}
        />
      </Box>
    </Box>
  );
};

const ResultCard = (props) => {
  const { Icon: { URL }, FirstURL } = props;
  return (
    <div>
      <img src={URL} />
      <Text>{props.Text}</Text>
      <br />
      <a href={FirstURL}>Link</a>
    </div>
  );
};

const DuckDuckGoWrapper = () => {
  const [currentContent, setCurrentContent] = useState([]);
  const [chosenResult, setChosenResult] = useState(null);
  const searchFunc = async (searchTerm) => {
    if (!searchTerm) {
      setCurrentContent([]);
      return;
    }
    const results = await Axios.get(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(
        searchTerm,
      )}&format=json`,
    );
    const STRING_CUT = 50;
    const endResults = results.data.RelatedTopics.map((el) => {
      if (el.Text) {
        return {
          ...el,
          shortened: el.Text.length > STRING_CUT
            ? `${el.Text.slice(0, STRING_CUT)}...`
            : el.Text,
        };
      }
      return {
        ...el.Topics[0],
        shortened: el.Topics[0].Text.length > STRING_CUT
          ? `${el.Topics[0].Text.slice(0, STRING_CUT)}...`
          : el.Topics[0].Text,
      };
    });
    setCurrentContent(endResults);
  };

  return (
    <Box type="secondary">
      <Box horizontal style={{ width: '500px' }}>
        <Search
          placeholder="Search DuckDuckGo..."
          content={currentContent}
          searchHandler={searchFunc}
          contentLabel="shortened"
          resultHandler={setCurrentContent}
          itemChooseHandler={setChosenResult}
        />
      </Box>
      {chosenResult && (
        <ResultCard {...chosenResult} />
      )}
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add(
    'Search',
    () => (
      <StoryWrapper p={15}>
        <Box horizontal p={50}>
          <Box vertical space={20}>
            <Text isTitle>Search</Text>
            <SearchWrapper />
          </Box>
          <Box vertical space={20}>
            <Text isTitle>Search</Text>
            <DuckDuckGoWrapper />
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
