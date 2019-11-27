import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Box from '../box';
import DecisionDropdown from '.';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const CONTENT = [{
  title: 'Hello',
  subtitle: 'Sup man',
  suboptions: [
    { label: 'Thing 1', value: 'thing1' },
    {
      label: 'Thing 2',
      sublabel: 'With more stuff',
      value: 'thing2',
      options: [
        {
          label: 'Thing 1-A',
          sublabel: '(Has sublevels)',
          options: [
            { label: 'Thing 2-A', value: 'thing2a' },
            { label: 'Thing 2-B', value: 'thing2b' },
          ],
          value: 'thing1a',
        },
        {
          label: 'Thing 1-B',
          sublabel: '(Has sublevels)',
          value: 'thing1b',
          options: [
            {
              title: 'Sub Card Alpha',
              suboptions: [{
                label: 'Alpha 1', value: 'alpha1',
              }, {
                label: 'Alpha 2', value: 'alpha2', sublabel: 'Some more info on alpha 2',
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
              subtitle: 'Sub Card Gamma, but only as subtitle',
              suboptions: [{
                label: 'Gamma 1', value: 'gamma1',
              }, {
                label: 'Gamma 2', value: 'gamma2',
              }, {
                label: 'Gamma 3', value: 'gamma3',
              },
              {
                label: 'Gamma 4', value: 'gamma4',
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
  emptyMessage: 'Dropdown region temporarily under maintenance',
}];

const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <DecisionDropdown onChange={changeChosen} value={chosen} {...props} />
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Decision Dropdown', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Box type="secondary">
          <Text isTitle>Dropdown</Text>
          <Text isTitle size="small">Full decision tree</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler data={CONTENT} />
            <DropdownHandler data={CONTENT} size="large" />
          </Box>
          <Text isTitle size="small">Simple content</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler data={[{ label: 'whoa', value: 'ay' }]} />
            <DropdownHandler data={[{ label: 'whoa', value: 'ay' }]} size="large" />
          </Box>
          <Text isTitle size="small">Multiselect</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler data={CONTENT} isMulti />
            <DropdownHandler data={CONTENT} isMulti size="large" />
          </Box>
          <Text isTitle size="small">Loading</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler loading data={CONTENT} />
            <DropdownHandler loading data={CONTENT} size="large" />
          </Box>
          <Text isTitle size="small">Disabled</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler disabled data={CONTENT} />
            <DropdownHandler disabled data={CONTENT} size="large" />
          </Box>
          <Text isTitle size="small">Error</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler error data={CONTENT} />
            <DropdownHandler error data={CONTENT} size="large" />
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
