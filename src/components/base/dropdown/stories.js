import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Box from '../box';
import Dropdown from '.';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
// import Info from './info.md';

const CONTENT = [{
  title: 'Hello',
  subTitle: 'Sup man',
  suboptions: [
    { label: 'Thing 1', value: 'thing1' },
    {
      label: 'Thing 2',
      subLabel: 'With more stuff',
      value: 'thing2',
      options: [
        {
          label: 'Thing 1-A',
          subLabel: '(Has sublevels)',
          options: [
            { label: 'Thing 2-A', value: 'thing2a' },
            { label: 'Thing 2-B', value: 'thing2b' },
          ],
          value: 'thing1a',
        },
        {
          label: 'Thing 1-B',
          subLabel: '(Has sublevels)',
          value: 'thing1b',
          options: [
            {
              title: 'Sub Card Alpha',
              suboptions: [{
                label: 'Alpha 1', value: 'alpha1',
              }, {
                label: 'Alpha 2', value: 'alpha2', subLabel: 'Some more info on alpha 2',
              }, {
                label: 'Alpha 3', value: 'alpha3',
              }],
            },
            {
              suboptions: [{
                label: 'Beta 1', value: 'beta1',
              }],
            },
            {
              subTitle: 'Sub Card Gamma, but only as subtitle',
              suboptions: [{
                label: 'Gamma 1', value: 'gamma1',
              }, {
                label: 'Gamma 2', value: 'gamma2',
              }, {
                label: 'Gamma 3', value: 'gamma3',
              },
              {
                label: 'Gamma 4', value: 'gamma3',
              }],
            },
          ],
        },
        { label: 'Thing 1-C', value: 'thing1c' },
      ],
    }],
},
{
  title: 'More content',
  suboptions: [
    { label: 'Thing A', value: 'thinga' },
    { label: 'Thing B', value: 'thingb' },
    { label: 'Thing C', value: 'thingc' },
  ],
}, {
  title: 'Empty content',
  suboptions: [],
  // emptyMessage: 'Dropdown region temporarily under maintenance',
}];

const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);
  console.log(chosen);
  return (
    <Box style={{ width: '300px' }}>
      <Dropdown onChange={changeChosen} value={chosen} {...props} />
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Dropdown', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Box>
          <Text isTitle>Dropdown</Text>
          <Box style={{ width: '300px' }}>
            {/* <DropdownHandler loading content={CONTENT} /> */}
          </Box>
          <Box style={{ width: '300px' }}>
            <DropdownHandler data={CONTENT} />
          </Box>
          <Box style={{ width: '300px' }}>
            <DropdownHandler data={[{ label: 'whoa', value: 'ay' }]} size="large" />
          </Box>
          <Box style={{ width: '300px' }}>
            <DropdownHandler data={CONTENT} isMulti />
          </Box>
          <Box style={{ width: '300px' }}>
            <DropdownHandler data={CONTENT} isMulti size="large" />
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      // markdown: Info,
    },
  });
