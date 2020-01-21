import React from 'react';
import QuoteProductTag from '../../../financial/quote-product-tag';

export const CustomValue = ({ value: { label } }) => (
  <div
    style={{ padding: '4px' }}
  ><QuoteProductTag mainInfo={label} />
  </div>
);

const CustomItem = ({ children }) => (
  <QuoteProductTag mainInfo={children} />
);

export const SIMPLE_CUSTOM_ITEM_CONTENT = [
  {
    title: 'Tags',
    suboptions: [
      { label: 'Content 1', value: 'content1', CustomItem },
      { label: 'Content 2', value: 'content2', CustomItem },
      { label: 'Content 3', value: 'content3', CustomItem },
      { label: 'Content 4', value: 'content4', CustomItem },
      { label: 'Content 5', value: 'content5', CustomItem },
    ],
  },
];
