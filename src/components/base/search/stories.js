import React, { useState, useEffect } from 'react';
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
let nameValue;
for (let i = 0; i < 15; i++) {
  nameValue = Faker.name.firstName();
  mockData.push({
    label: nameValue,
    value: nameValue,
  });
}

const SearchWrapper = ({ CustomMenuItem, isMulti, isStack }) => {
  const [currentdata, setCurrentdata] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

  const filterFunc = (searchTerm) => {
    setCurrentdata(
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
          isStack={isStack}
          value={currentValue}
          data={currentdata}
          searchHandler={filterFunc}
          resultHandler={setCurrentdata}
          itemChooseHandler={newValue => setCurrentValue(newValue)}
          CustomMenuItem={CustomMenuItem}
          isMulti={isMulti}
        />
      </Box>
    </Box>
  );
};

const ResultCard = (props) => {
  const {
    Icon: { URL },
    FirstURL,
  } = props;
  return (
    <div>
      <img src={URL} />
      <Text>{props.Text}</Text>
      <br />
      <a href={FirstURL}>Link</a>
    </div>
  );
};

const DATA = {
  init: [
    { label: 'Drinks', value: 'drinks' },
    { label: 'Food', value: 'food' },
  ],
  drinks: [
    { label: 'Juice', value: 'juice' },
    { label: 'Cocktails', value: 'cocktails' },
    { label: 'Soda', value: 'soda' },
  ],
  juice: [
    { label: 'Orange', value: 'orange' },
    { label: 'Apple', value: 'apple' },
  ],
  cocktails: [
    { label: 'Old Fashioned', value: 'old-fashioned' },
    { label: 'Highball', value: 'highball' },
    { label: 'Caipirinha', value: 'caipirinha' },
    { label: 'Sangria', value: 'sangria' },
  ],
  soda: [
    { label: 'Cola', value: 'cola' },
    { label: 'Cream Soda', value: 'cream-soda' },
    { label: 'Lemon Seltzer', value: 'lemon' },
  ],
  food: [
    { label: 'Mains', value: 'main' },
    { label: 'Sweet', value: 'sweet' },
  ],
  sweet: [
    { label: 'Flan', value: 'flan' },
    { label: 'Parfait', value: 'parfait' },
    { label: 'Pie Slice', value: 'pie' },
  ],
  mains: [
    { label: 'Steak and Fries', value: 'steak-fries' },
    { label: 'Burger', value: 'burger' },
    { label: 'Falafel Wrap', value: 'falafel-wrap' },
    { label: 'Fried Eggs', value: 'fried-eggs' },
    { label: 'Sushi', value: 'sushi' },
  ],
};

const MultiAsync = () => {
  const [currentData, setCurrentData] = useState([]);
  const [value, setValue] = useState(null);

  const searchFunc = async (searchTerm) => setTimeout(() => {
    let currentLayer;
    if (!value || !value.length) {
      currentLayer = DATA.init;
    } else {
      // Omg this is so ugly
      currentLayer = DATA[value[value.length - 1].value];
    }
    console.log(value, currentLayer);
    setCurrentData(currentLayer.filter((el) => {
      if (el.label.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    }));
  }, 500);

  useEffect(() => {
    if (value && value.length) {
      console.log('Getting layer!!', value);
      searchFunc();
    }
  }, [value]);

  return (
    <Box type="secondary">
      <Box horizontal style={{ width: '500px' }}>
        <Search
          isMulti
          isStack
          placeholder="Layered Search..."
          data={currentData}
          searchHandler={searchFunc}
          dataLabel="value"
          resultHandler={setCurrentData}
          value={value}
          itemChooseHandler={setValue}
        />
      </Box>
    </Box>
  );
};

const DuckDuckGoWrapper = () => {
  const [currentdata, setCurrentdata] = useState([]);
  const [chosenResult, setChosenResult] = useState(null);
  const searchFunc = async (searchTerm) => {
    if (!searchTerm) {
      setCurrentdata([]);
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
          shortened:
            el.Text.length > STRING_CUT
              ? `${el.Text.slice(0, STRING_CUT)}...`
              : el.Text,
        };
      }
      return {
        ...el.Topics[0],
        shortened:
          el.Topics[0].Text.length > STRING_CUT
            ? `${el.Topics[0].Text.slice(0, STRING_CUT)}...`
            : el.Topics[0].Text,
      };
    });
    setCurrentdata(endResults);
  };

  return (
    <Box type="secondary">
      <Box horizontal style={{ width: '500px' }}>
        <Search
          placeholder="Search DuckDuckGo..."
          data={currentdata}
          searchHandler={searchFunc}
          dataLabel="shortened"
          resultHandler={setCurrentdata}
          itemChooseHandler={setChosenResult}
        />
      </Box>
      {chosenResult && <ResultCard {...chosenResult} />}
    </Box>
  );
};

const CustomItem = ({ item }) => (
  <Text
    style={{
      color: '#DEE4E7',
      backgroundColor: '#37474F',
      padding: '4px 6px',
      borderRadius: '3px',
      transition: 'all 0.3s linear',
    }}
  >
    {item.label}
  </Text>
);

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
            <Box vertical space={20}>
              <Text isTitle>Search</Text>
              <SearchWrapper />
            </Box>
          </Box>
          <Box vertical space={20}>
            <Text isTitle>Search Multiselect</Text>
            <SearchWrapper isMulti />
            <Box vertical space={20}>
              <Text isTitle>Search Multiselect</Text>
              <SearchWrapper isMulti isStack />
            </Box>
          </Box>
          <Box vertical space={20}>
            <Text isTitle>Search with custom Menu Item</Text>
            <SearchWrapper CustomMenuItem={CustomItem} />
          </Box>
          <Box vertical space={20}>
            <Text isTitle>Layered Async Search</Text>
            <MultiAsync />
          </Box>
          <Box vertical space={20}>
            <Text isTitle>Async Search</Text>
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
