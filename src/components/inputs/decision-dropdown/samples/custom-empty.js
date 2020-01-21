import React from 'react';
import { withTheme } from 'styled-components';
import Box from '../../../layout/box';
import Text from '../../../misc/text';
import Button from '../../../misc/button';

export const CustomEmptyComponent = withTheme(({ theme }) => (
  <Box
    style={{
      margin: '8px', padding: '8px', borderRadius: '4px', backgroundColor: theme.colors.grey_200,
    }}
    justify="center"
    align="center"
    type="secondary"
  >
    <Text type="primary">My Custom component with a demo button!</Text>
    <Box horizontal>
      <Button onMouseDown={() => alert('Custom empty!')}>Sample button</Button>
    </Box>
  </Box>
));

export const CUSTOM_EMPTY = [{
  title: 'More content',
  suboptions: [
    { label: 'Thing A', value: 'thinga' },
    { label: 'Thing B', value: 'thingb' },
    { label: 'Thing C', value: 'thingc' },
  ],
}, {
  title: 'Empty content',
  suboptions: [],
  CustomEmptyComponent: <CustomEmptyComponent />,
}];
