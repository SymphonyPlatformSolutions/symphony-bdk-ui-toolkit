import React from 'react';
import { TextSizeProvider } from './text-size-provider';

const withTextSizer = (sizes) => (story) => {
  return <TextSizeProvider sizes={sizes}>{story()}</TextSizeProvider>
}

export default withTextSizer;