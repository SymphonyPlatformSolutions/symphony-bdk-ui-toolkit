import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../box';
import Text from '../text';
import Info from './info.md';
import { COUNTRIES_LIST } from './countries';

import { StoryWrapper } from '../wrappers';
import Flag from './index';

const buildFlagMap = () => {
  const map = [];
  const SIZE = 12;
  for (let i = 0; i < COUNTRIES_LIST.length; i += SIZE) {
    const row = Math.floor(i / SIZE);
    map[row] = [];
    for (let j = i; j < i + SIZE; j++) {
      if (COUNTRIES_LIST[j]) {
        map[row].push(COUNTRIES_LIST[j]);
      }
    }
  }

  return map;
};
const DATA = buildFlagMap();

storiesOf('Base', module)
  .add('Flag', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Country flags</Text>
        { DATA.map(row => (
          <Box horizontal space={20}>
            { row.map(flag => (
              <Box vertical align="center" style={{width: '35px'}}>
                <Text title size="tiny">
                  {flag}
                </Text>
                <Flag countryCode={flag} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
