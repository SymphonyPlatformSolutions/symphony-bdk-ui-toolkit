import React from 'react';
import { COUNTRIES_LIST } from '../countries';
import Text from '../../text';
import Box from '../../../layout/box';
import Flag from '../index';

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


export const FlagMatrix = () => (
  <Box space={20}>
    { DATA.map((row, i) => (
      <Box horizontal space={20} key={`a-${i}`}>
        { row.map((flag, j) => (
          <Box vertical align="center" style={{ width: '35px' }} key={`a-${j}`}>
            <Text isTitle size="tiny">
              {flag}
            </Text>
            <Flag countryCode={flag} />
          </Box>
        ))}
      </Box>
    ))}
  </Box>
);
