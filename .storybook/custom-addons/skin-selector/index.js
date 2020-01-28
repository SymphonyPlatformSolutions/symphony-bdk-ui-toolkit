import React from 'react';
import { SkinThemeProvider } from './skin-theme-provider';

const withSkinThemeSelector = (sizes) => (story) => {
  return <SkinThemeProvider sizes={sizes}>{story()}</SkinThemeProvider>
}

export default withSkinThemeSelector;
