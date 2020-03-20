import React from 'react';
import { withTheme } from 'styled-components';
import { ZoomButtons } from 'react-stockcharts';


export const ChartZoom = withTheme(({ onReset, theme }) => (
  <ZoomButtons
    onReset={onReset}
    rx={15}
    ry={15}
    size={[60, 25]}
    fontSize={14}
    heightFromBase={40}
    fill={theme.colors.primary_500}
    fillOpacity={1}
    strokeOpacity={0}
    textDy="1rem"
    textFill={theme.colors.white}
  />
));
