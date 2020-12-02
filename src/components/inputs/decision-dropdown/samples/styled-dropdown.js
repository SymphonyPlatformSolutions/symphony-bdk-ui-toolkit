import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '../../../layout/box';
import DecisionDropdown from '../index';

const colors = [
  '#FF9AA2',
  '#FFB7B2',
  '#FFDAC1',
  '#e2f0cb',
  '#b5ead7',
];

const getColor = (value) => colors[value.selectableArray.findIndex(el => el.uid === value.uid)];

const StyledDropdown = styled(DecisionDropdown)`
  background-color: ${({ colorIndex }) => (colorIndex ? getColor(colorIndex) : undefined)};
  transition: background-color 0.3s;
`;

export const StyledDropdownHandler = props => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <StyledDropdown
        colorIndex={chosen}
        onChange={changeChosen}
        value={chosen}
        {...props}
      />
    </Box>
  );
};
