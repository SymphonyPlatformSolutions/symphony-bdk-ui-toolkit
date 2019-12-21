import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import { withTheme } from 'styled-components';
import Box from '../box';
import DecisionDropdown from '.';
import Text from '../text';
import Button from '../button';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const CONTENT = [{
  title: 'Full decision tree',
  subtitle: 'A big example of navigation',
  suboptions: [
    { label: 'Cripto Currencies', value: 'thing1' },
    {
      label: 'Fixed Income',
      sublabel: 'Bonds, GICs, MBS',
      value: 'thing2',
      options: [
        {
          label: 'Dealer A',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'London office', value: 'alpha1',
              }, {
                label: 'Frankfurt office', value: 'alpha2',
              }, {
                label: 'Paris office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: 'alpha1',
              }, {
                label: 'San Francisco office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
        {
          label: 'Dealer B',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'Warsaw office', value: 'alpha1',
              }, {
                label: 'Lisbon office', value: 'alpha2',
              }, {
                label: 'Gibraltar office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: 'alpha1',
              }, {
                label: 'Lima office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
      ],
    }],
},
{
  title: 'More content',
  suboptions: [
    {
      label: 'Cash Equivalent',
      sublabel: 'Commercial papers, etc..',
      value: 'thing2',
      options: [
        {
          label: 'Dealer C',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'London office', value: 'alpha1',
              }, {
                label: 'Frankfurt office', value: 'alpha2',
              }, {
                label: 'Paris office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: 'alpha1',
              }, {
                label: 'San Francisco office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
        {
          label: 'Dealer D',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'Warsaw office', value: 'alpha1',
              }, {
                label: 'Lisbon office', value: 'alpha2',
              }, {
                label: 'Gibraltar office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: 'alpha1',
              }, {
                label: 'Lima office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
      ],
    },
    {
      label: 'Equity',
      sublabel: '',
      value: 'thing2',
      options: [
        {
          label: 'Dealer C',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'London office', value: 'alpha1',
              }, {
                label: 'Frankfurt office', value: 'alpha2',
              }, {
                label: 'Paris office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: 'alpha1',
              }, {
                label: 'San Francisco office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
        {
          label: 'Dealer D',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'Warsaw office', value: 'alpha1',
              }, {
                label: 'Lisbon office', value: 'alpha2',
              }, {
                label: 'Gibraltar office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: 'alpha1',
              }, {
                label: 'Lima office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
      ],
    },
    {
      label: 'Commodities',
      sublabel: 'Steel, Silver, Gold, etc.',
      value: 'thing2',
      options: [
        {
          label: 'Dealer C',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'London office', value: 'alpha1',
              }, {
                label: 'Frankfurt office', value: 'alpha2',
              }, {
                label: 'Paris office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: 'alpha1',
              }, {
                label: 'San Francisco office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
        {
          label: 'Dealer D',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'Warsaw office', value: 'alpha1',
              }, {
                label: 'Lisbon office', value: 'alpha2',
              }, {
                label: 'Gibraltar office', value: 'alpha3',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: 'alpha1',
              }, {
                label: 'Lima office', value: 'alpha2', sublabel: 'subsidiary',
              }, {
              }],
            },
          ],
          value: 'thing1a',
        },
      ],
    },
  ],
}, {
  title: 'Empty content',
  suboptions: [],
  emptyMessage: 'Dropdown region temporarily under maintenance',
}];
const CustomEmptyComponent = withTheme(({ theme }) => (
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
      <Button onMouseDown={() => alert('Custom empty!')}>This button!</Button>
    </Box>
  </Box>
));
const CUSTOM_EMPTY = [{
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

const SIMPLE_CONTENT = [
  { label: 'Content 1', value: 'content1' },
  { label: 'Content 2', value: 'content2' },
  { label: 'Content 3', value: 'content3' },
  { label: 'Content 4', value: 'content4' },
  { label: 'Content 5', value: 'content5' },
];

const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <DecisionDropdown onChange={changeChosen} value={chosen} {...props} />
    </Box>
  );
};

const AsyncDropdownHandler = (props) => {
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

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Decision Dropdown', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text isTitle>Dropdown</Text>
        <Box>
          <Box type="secondary" horizontal>
            <Box>
              <Text isTitle size="small">Full decision tree</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler data={CONTENT} />
                <DropdownHandler data={CONTENT} size="large" />
              </Box>
            </Box>
            <Box>
              <Text isTitle size="small">Simple content</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler data={SIMPLE_CONTENT} />
                <DropdownHandler data={SIMPLE_CONTENT} size="large" />
              </Box>
            </Box>
            <Box>
              <Text isTitle size="small">Tooltip</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler data={SIMPLE_CONTENT} tooltip="Important info!" />
                <DropdownHandler data={SIMPLE_CONTENT} tooltip="Important info!" size="large" />
              </Box>
            </Box>
          </Box>
          <Box type="secondary" horizontal>
            <Box>
              <Text isTitle size="small">Multiselect</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler data={CONTENT} isMulti />
                <DropdownHandler data={CONTENT} isMulti size="large" />
              </Box>
            </Box>
            <Box>
              <Text isTitle size="small">Loading</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler loading data={CONTENT} />
                <DropdownHandler loading data={CONTENT} size="large" />
              </Box>
            </Box>
            <Box>
              <Text isTitle size="small">Async</Text>
              <Box style={{ width: '300px' }}>
                <AsyncDropdownHandler data={SIMPLE_CONTENT} />
                <AsyncDropdownHandler data={SIMPLE_CONTENT} size="large" />
              </Box>
            </Box>
          </Box>
          <Box type="secondary" horizontal>
            <Box>
              <Text isTitle size="small">Disabled</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler disabled data={CONTENT} />
                <DropdownHandler disabled data={CONTENT} size="large" />
              </Box>
            </Box>
            <Box>
              <Text isTitle size="small">Error</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler errorMessage="My custom error message" data={CONTENT} />
                <DropdownHandler errorMessage="My custom error message" data={CONTENT} size="large" />
              </Box>
            </Box>
            <Box>
              <Text isTitle size="small">Custom Empty Component</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler data={CUSTOM_EMPTY} />
                <DropdownHandler data={CUSTOM_EMPTY} size="large" />
              </Box>
            </Box>
          </Box>
          <Box type="secondary" horizontal>
            <Box>
              <Text isTitle size="small">With Back Button</Text>
              <Box style={{ width: '300px' }}>
                <DropdownHandler hasBackButton data={CONTENT} />
                <DropdownHandler hasBackButton data={CONTENT} size="large" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box style={{ height: '400px' }} />
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
