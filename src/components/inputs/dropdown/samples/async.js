import React, { useState } from 'react';
import Box from '../../../layout/box';
import Dropdown from '../index';

export const AsyncDropdownHandler = (props) => {
  const { options, ...rest } = props;
  const [chosen, changeChosen] = useState(null);
  const [isLoading, toggleIsLoading] = useState(false);
  const [loadedOptions, changeLoadedOptions] = useState([]);

  return (
    <Box style={{ width: '300px' }}>
      <Dropdown
        {...rest}
        value={chosen}
        onChange={changeChosen}
        isLoading={isLoading}
        clickHandler={() => {
          toggleIsLoading(true);
          changeLoadedOptions([]);
          setTimeout(() => {
            changeLoadedOptions(options.slice(Math.floor(Math.random() * 3) + 2));
            toggleIsLoading(false);
          }, 1000);
        }}
        options={loadedOptions}
      />
    </Box>
  );
};
