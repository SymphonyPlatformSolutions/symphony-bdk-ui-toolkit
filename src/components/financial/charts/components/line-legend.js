import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

export const LineChartLegend = withTheme(({
  theme, height, containerHeight, margin, lineColors, padding, data,
}) => {
  const [rect, setRect] = useState({
    x: padding,
    y: containerHeight - (margin.bottom + margin.top) - padding - height,
    width: (lineColors.length * 60) + 20,
    height,
  });

  useEffect(() => {
    setRect({
      x: padding,
      y: containerHeight - height - (margin.bottom + margin.top) - padding,
      width: (lineColors.length * 60),
      height,
    });
  }, [height, containerHeight, margin, lineColors]);
  return (
    <g transform={`translate(${rect.x}, ${rect.y})`}>
      <rect
        width={rect.width}
        height={rect.height}
        fill={`${theme.colors.grey_300}E9`}
      />
      {lineColors.map((stroke, i) => (
        <g
          transform={`translate(${10 + (i * 60)}, 0)`}
          y="0"
          fill="none"
          height={height}
          width={60}
        >
          <svg width="40px" height="40px">
            <text
              x="50%"
              y="50%"
              strokeWidth={1}
              textAnchor="middle"
              fontSize={12}
              fill="none"
              fontFamily="Verdana"
              dominantBaseline="middle"
              stroke={theme.colors.grey_600}
            >
              {data.prices[i].label}
            </text>
          </svg>
          <line
            y1="30"
            y2="30"
            x1="0"
            x2="40"
            stroke={stroke}
            strokeWidth={2}
          />
        </g>
      ))}
    </g>
  );
});

LineChartLegend.defaultProps = {
  height: 40,
  padding: 15,
};
LineChartLegend.propTypes = {
  containerHeight: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
  }).isRequired,
  lineColors: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  height: PropTypes.number,
  padding: PropTypes.number,
};
