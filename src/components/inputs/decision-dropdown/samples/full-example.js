import React, { useState } from 'react';
import Box from '../../../layout/box';
import DecisionDropdown from '../index';

export const CONTENT = [{
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
                label: 'London office', value: '1alondon',
              }, {
                label: 'Frankfurt office', value: '1afrankfurt',
              }, {
                label: 'Paris office', value: '1aparis',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: '1aNY',
              }, {
                label: 'San Francisco office', value: '1aSF', sublabel: 'subsidiary',
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
                label: 'Warsaw office', value: '1bwarsaw',
              }, {
                label: 'Lisbon office', value: '1blisbon',
              }, {
                label: 'Gibraltar office', value: '1bgibraltar',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: '1bSP',
              }, {
                label: 'Lima office', value: '1blima', sublabel: 'subsidiary',
              }],
            },
          ],
          value: 'thing1b',
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
                label: 'London office', value: '2alondon',
              }, {
                label: 'Frankfurt office', value: '2afrankfurt',
              }, {
                label: 'Paris office', value: '2aparis',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: '2aNY',
              }, {
                label: 'San Francisco office', value: '2aSF', sublabel: 'subsidiary',
              }],
            },
          ],
          value: 'thing2a',
        },
        {
          label: 'Dealer D',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'Warsaw office', value: '2bwarsaw',
              }, {
                label: 'Lisbon office', value: '2blisbon',
              }, {
                label: 'Gibraltar office', value: '2bgibraltar',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: '2bSP',
              }, {
                label: 'Lima office', value: '2blima', sublabel: 'subsidiary',
              }],
            },
          ],
          value: 'thing2b',
        },
      ],
    },
    {
      label: 'Equity',
      sublabel: '',
      value: 'thing3',
      options: [
        {
          label: 'Dealer C',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'London office', value: '3alondon',
              }, {
                label: 'Frankfurt office', value: '3afrankfurt',
              }, {
                label: 'Paris office', value: '3aparis',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: '3aNY',
              }, {
                label: 'San Francisco office', value: '3alima', sublabel: 'subsidiary',
              }],
            },
          ],
          value: 'thing3a',
        },
        {
          label: 'Dealer D',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'Warsaw office', value: '3bwarsaw',
              }, {
                label: 'Lisbon office', value: '3blisbon',
              }, {
                label: 'Gibraltar office', value: '3bgibraltar',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: '3bSP',
              }, {
                label: 'Lima office', value: '3blima', sublabel: 'subsidiary',
              }],
            },
          ],
          value: 'thing3b',
        },
      ],
    },
    {
      label: 'Commodities',
      sublabel: 'Steel, Silver, Gold, etc.',
      value: 'thing4',
      options: [
        {
          label: 'Dealer C',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'London office', value: '4alondon',
              }, {
                label: 'Frankfurt office', value: '4afrankfurt',
              }, {
                label: 'Paris office', value: '4aparis',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'New York office', value: '4aNY',
              }, {
                label: 'San Francisco office', value: '4aSF', sublabel: 'subsidiary',
              }],
            },
          ],
          value: 'thing4a',
        },
        {
          label: 'Dealer D',
          sublabel: 'Offices in Europe and Americas',
          options: [
            {
              title: 'Europe',
              suboptions: [{
                label: 'Warsaw office', value: '4bwarsaw',
              }, {
                label: 'Lisbon office', value: '4blisbon',
              }, {
                label: 'Gibraltar office', value: '4bgibraltar',
              }],
            },
            {
              title: 'Americas',
              suboptions: [{
                label: 'Sao Paulo office', value: '4bSP',
              }, {
                label: 'Lima office', value: '4blima', sublabel: 'subsidiary',
              }],
            },
          ],
          value: 'thing4b',
        },
      ],
    },
  ],
}, {
  title: 'Empty content',
  suboptions: [],
  emptyMessage: 'Dropdown region temporarily under maintenance',
}];

export const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <DecisionDropdown onChange={changeChosen} value={chosen} {...props} />
    </Box>
  );
};
