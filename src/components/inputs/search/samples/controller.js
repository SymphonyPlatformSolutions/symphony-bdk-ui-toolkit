import React, { useState } from 'react';
import Faker from 'faker';
import Search from '../index';
import Box from '../../../layout/box';

const mockData = [];
let nameValue;
for (let i = 0; i < 15; i++) {
  nameValue = Faker.name.firstName();
  mockData.push({
    label: nameValue,
    value: nameValue,
  });
}

export const SearchWrapper = ({ CustomMenuItem, isMulti, isStack }) => {
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
