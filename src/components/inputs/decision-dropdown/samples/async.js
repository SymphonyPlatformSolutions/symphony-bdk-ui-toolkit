import React, { useState } from 'react';
import Box from '../../../layout/box';
import DecisionDropdown from '../index';

export const AsyncDropdownHandler = (props) => {
  const { data, ...rest } = props;
  const [chosen, changeChosen] = useState(null);
  const [isLoading, toggleIsLoading] = useState(false);
  const [loadedOptions, changeLoadedOptions] = useState([]);

  return (
    <Box style={{ width: '300px' }}>
      <DecisionDropdown
        {...rest}
        value={chosen}
        onChange={changeChosen}
        loading={isLoading}
        clickHandler={() => {
          toggleIsLoading(true);
          changeLoadedOptions([]);
          setTimeout(() => {
            changeLoadedOptions(data.slice(Math.floor(Math.random() * 2) + 1));
            toggleIsLoading(false);
          }, 1000);
        }}
        data={loadedOptions}
      />
    </Box>
  );
};
