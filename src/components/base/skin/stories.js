import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Box from '../box';
import Text from '../text';
import Info from './info.md';
import { THEMES } from '../../../styles/colors';
import { StoryWrapper } from '../wrappers';
import Card from '../card';

const StyledComp = styled.div`
   background-color: ${(props) => props.color};
   width: 50px;
   height: 50px;
   margin: 30px 30px;
`;

const ThemeShowCase = () => {
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
            {lightColorsMap.map((entry) => (
              <Box align="center" space={4}>
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
            {darkColorsMap.map((entry) => (
              <Box align="center" space={4}>
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

storiesOf('Base', module)
  .add('Themes', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <ThemeShowCase />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
