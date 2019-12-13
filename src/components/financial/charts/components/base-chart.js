import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { scaleTime } from 'd3-scale';
import { ChartCanvas } from 'react-stockcharts';
import { last } from 'react-stockcharts/lib/utils';
import {
  CrossHairCursor,
} from 'react-stockcharts/lib/coordinates';
import { useDebouncedCallback } from 'use-debounce';
import { HoverTooltip } from 'react-stockcharts/lib/tooltip';
import Loader from '../../../base/loader';
import { LoadingContainer } from '../candlestick/themes';

const ChartBuilder = withTheme(({
  theme, data, width, height, ratio = 1,
  hasGrid, clampType, hasEdgeIndicator,
  tooltipContent, mouseMoveEvent, hasCrossHair,
  hasZoom, margin, hasOHLCTooltip, shownWindow,
  children,
}) => {
  const [gridCoordinates, setGridCoordinates] = useState({ xGrid: {}, yGrid: {} });
  const [suffix, setSuffix] = useState(0);
  const xAccessor = useCallback(d => d.date);

  const xExtends = [
    xAccessor(last(data)),
    xAccessor(data[data.length - shownWindow]),
  ];

  const resetZoom = useCallback(() => {
    setSuffix(suffix + 1);
  });

  useEffect(() => {
    if (hasGrid) {
      setGridCoordinates({
        xGrid: {
          innerTickSize: -1 * height,
          tickStrokeOpacity: 0.1,
        },
        yGrid: {
          innerTickSize: -1 * width,
          tickStrokeOpacity: 0.1,
        },
      });
    } else {
      setGridCoordinates({
        xGrid: {},
        yGrid: {},
      });
    }
  }, [width, height, hasGrid]);

  const CanvasRef = useRef();

  return (
    <ChartCanvas
      ref={CanvasRef}
      ratio={ratio}
      height={height}
      width={width}
      margin={margin}
      type="hybrid"
      seriesName={`MSFT_${suffix}`}
      data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtends}

      mouseMoveEvent={mouseMoveEvent}
      panEvent={hasZoom.panEvent}
      zoomEvent={hasZoom.enabled}
      clam={clampType}

    >
      {children({
        width,
        height,
        ratio,
        gridCoordinates,
        data,
        zoomEnabled: hasZoom.enabled,
        hasEdgeIndicator,
        resetZoom,
        hasOHLCTooltip,
      })}
      {tooltipContent && (
        <HoverTooltip
          tooltipContent={tooltipContent}
          fontSize={15}
        />
      )}
      {hasCrossHair && <CrossHairCursor /> }
    </ChartCanvas>
  );
});

ChartBuilder.defaultProps = {
  hasGrid: false,
  hasCrossHair: false,
  hasEdgeIndicator: false,
  tooltipContent: null,
  mouseMoveEvent: true,
  hasOHLCTooltip: false,
  hasZoom: {
    panEvent: false,
    enabled: false,
  },
  clampType: null,
  margin: {
    left: 50,
    right: 50,
    top: 10,
    bottom: 30,
  },
  shownWindow: 100,
};

ChartBuilder.propTypes = {
  hasGrid: PropTypes.bool,
  hasCrossHair: PropTypes.bool,
  hasEdgeIndicator: PropTypes.bool,
  tooltipContent: PropTypes.func,
  mouseMoveEvent: PropTypes.bool,
  hasOHLCTooltip: PropTypes.bool,
  hasZoom: PropTypes.shape({
    panEvent: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  clampType: PropTypes.oneOf([
    'mouseBasedZoomAnchor',
    'lastVisibleItemBasedZoomAnchor',
    'rightDomainBasedZoomAnchor',
    null,
  ]),
  margin: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
  }),
  shownWindow: PropTypes.number,
};

const ChartContainer = ({
  loading, data, children, ...rest
}) => {
  const mRef = useRef();
  const [size, setSize] = useState(null);

  const [setDimensions] = useDebouncedCallback(
    () => {
      if (mRef.current) {
        setSize({
          width: mRef.current.offsetWidth,
          height: mRef.current.offsetHeight,
        });
      }
    },
    // delay in ms
    100,
  );

  useEffect(() => {
    setDimensions();
    window.addEventListener('resize', setDimensions);
    return () => window.removeEventListener('resize', setDimensions);
  }, [mRef.current]);

  const Memoized = useMemo(() => {
    if (loading || !data || !data.length || !size) {
      return (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      );
    }
    return (
      <ChartBuilder data={data} width={size.width} height={size.height} {...rest}>
        {children}
      </ChartBuilder>
    );
  }, [data, loading, size, mRef, children]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={mRef}>
      {Memoized}
    </div>
  );
};

ChartContainer.defaultProps = {
  loading: false,
};

ChartContainer.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

export default ChartContainer;
