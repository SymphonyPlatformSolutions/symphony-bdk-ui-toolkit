import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { SSEProvider, useSSE } from 'react-hooks-sse';
import { useAutoFetch } from '../../../utils/auto-fetch';
import { buildDateParser } from '../../financial/charts/helpers';

const timeParser = buildDateParser('%Y-%m-%d');

const isStateValid = (state, data) => state && state.data !== null && data;

const SSE_EVENT_TYPES = {
  UPDATE: 'update',
  CREATE: 'create',
  REMOVE: 'remove',
  FETCH: 'fetch',
};

const SSEventsContentWrapper = ({
  fetchData,
  loading,
  error,
  refreshData,
  children,
}) => {
  const updatedState = useSSE(SSE_EVENT_TYPES.UPDATE);
  const createdState = useSSE(SSE_EVENT_TYPES.CREATE);

  const [latestData, setLatestData] = useState(fetchData);
  const [latestMessageType, setMessageType] = useState(null);

  useEffect(() => {
    setLatestData(fetchData);
    setMessageType(SSE_EVENT_TYPES.FETCH);
  }, [fetchData]);

  useEffect(() => {
    setMessageType(SSE_EVENT_TYPES.UPDATE);
    if (isStateValid(updatedState, latestData)) {
      updatedState.data.forEach((element) => {
        const index = latestData.findIndex((value) => element.id === value.id);
        element.date = timeParser(element.date);
        element.updated = true;
        if (index !== -1) {
          latestData[index] = element;
        } else {
          latestData.push(element);
        }
      });
      setLatestData(Array.from(latestData));
    }
  }, [updatedState]);

  useEffect(() => {
    setMessageType(SSE_EVENT_TYPES.CREATE);
    if (isStateValid(createdState, latestData)) {
      let creatingData = false;
      latestData.forEach((elem) => {
        elem.updated = false;
      });
      createdState.data.forEach((elem) => {
        const index = latestData.findIndex((entry) => entry.id === elem.id);
        if (index === -1) {
          elem.date = timeParser(elem.date);
          latestData.push(elem);
          creatingData = true;
        }
      });

      if (creatingData) {
        setLatestData(Array.from(latestData));
      }
    }
  }, [createdState]);

  return useMemo(() => React.cloneElement(children, {
    data: latestData,
    loading,
    error,
    refreshData,
    eventType: latestMessageType,
  }), [latestData, loading]);
};

SSEventsContentWrapper.propTypes = {
  fetchData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  refreshData: PropTypes.func.isRequired,
  eventType: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SSEventsContentWrapper.defaultProps = {
  error: null,
  eventType: null,
};

const SSEventsListWrapper = ({
  children,
  sseEndpoint,
  autoFetchConfig,
}) => {
  const [fetchData, setFetchData] = useState([]);

  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);

  useEffect(() => {
    if (results !== fetchData) {
      const newData = results.map((elem) => {
        elem.updated = false;
        return elem;
      });
      setFetchData(newData);
    }
  }, [results]);

  return (
    <SSEProvider endpoint={sseEndpoint}>
      <SSEventsContentWrapper
        fetchData={fetchData}
        loading={isDataLoading}
        error={error}
        refreshData={refreshData}
      >
        {children}
      </SSEventsContentWrapper>
    </SSEProvider>
  );
};

SSEventsListWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  sseEndpoint: PropTypes.string.isRequired,
  autoFetchConfig: PropTypes.shape({
    endpoint: PropTypes.string,
    params: PropTypes.object,
    handleData: PropTypes.any,
  }).isRequired,
};


export default SSEventsListWrapper;
