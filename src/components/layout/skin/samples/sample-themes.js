import React from 'react';
import styled from 'styled-components';
import Box from '../../box';
import Text from '../../../misc/text';
import { THEMES } from '../../../../styles/colors';
import Card from '../../card';

const StyledComp = styled.div`
   background-color: ${(props) => props.color};
   width: 50px;
   height: 50px;
   margin: 30px 30px;
`;


export const LightTheme = () => {
  const light = THEMES[0];
  const lightColorsMap = Object.keys(light.colors).map((key) => ({
    key,
    value: light.colors[key],
  }));
  return (
    <Card>
      <Box type="flat" horizontal style={{ flexWrap: 'wrap' }} justify="space-evenly">
        {lightColorsMap.map((entry, i) => (
          <Box align="center" space={4} key={i}>
            <Text size="tiny">{entry.key}</Text>
            <StyledComp color={entry.value} />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export const DarkTheme = () => {
  const dark = THEMES[1];
  const darkColorsMap = Object.keys(dark.colors).map((key) => ({
    key,
    value: dark.colors[key],
  }));
  return (
    <Card>
      <Box type="flat" horizontal style={{ flexWrap: 'wrap' }} justify="space-evenly">
        {darkColorsMap.map((entry, i) => (
          <Box align="center" space={4} key={i}>
            <Text size="tiny">{entry.key}</Text>
            <StyledComp color={entry.value} />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export const ThemeShowCase = () => {
  const light = THEMES[0];
  const dark = THEMES[1];
  const lightColorsMap = Object.keys(light.colors).map((key) => ({
    key,
    value: light.colors[key],
  }));

  const darkColorsMap = Object.keys(dark.colors).map((key) => ({
    key,
    value: dark.colors[key],
  }));

  return (
    <Box space={10} horizontal>
      <Box vertical style={{ width: '50%' }}>
        <Box>
          <Text isTitle>Light theme colors</Text>
        </Box>
        <Card>
          <Box type="flat" horizontal style={{ flexWrap: 'wrap' }} justify="space-evenly">
            {lightColorsMap.map((entry, i) => (
              <Box align="center" space={4} key={i}>
                <Text size="tiny">{entry.key}</Text>
                <StyledComp color={entry.value} />
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
      <Box vertical style={{ width: '50%' }}>
        <Box>
          <Text isTitle>Dark theme colors</Text>
        </Box>
        <Card>
          <Box type="flat" horizontal style={{ flexWrap: 'wrap' }} justify="space-evenly">
            {darkColorsMap.map((entry, i) => (
              <Box align="center" space={4} key={i}>
                <Text size="tiny">{entry.key}</Text>
                <StyledComp color={entry.value} />
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
