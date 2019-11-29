import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { SSEProvider, useSSE } from 'react-hooks-sse';
import { useAutoFetch } from '../../../utils/auto-fetch';

const isStateValid = (state, data) => state && state.data !== null && data && data.length;

const SSE_EVENT_TYPES = {
  UPDATE: 'update',
  CREATE: 'create',
  REMOVE: 'remove',
};

const SSEventsContentWrapper = ({
  fetchData,
  loading,
  error,
  refreshData,
  eventType,
  children,
}) => {
  const updatedState = useSSE(SSE_EVENT_TYPES.UPDATE);
  const createdState = useSSE(SSE_EVENT_TYPES.CREATE);
  const removedState = useSSE(SSE_EVENT_TYPES.REMOVE);

  const [latestData, setLatestData] = useState(fetchData);

  useEffect(() => {
    setLatestData(fetchData);
  }, [fetchData]);

  useEffect(() => {
    if (isStateValid(updatedState, latestData)) {
      let hasUpdated = false;
      latestData.forEach((elem) => {
        elem.updated = false;
      });

      updatedState.data.forEach((element) => {
        const index = latestData.findIndex(value => element.id === value.id);
        if (index !== -1) {
          element.updated = true;
          latestData[index] = element;
          hasUpdated = true;
        }
      });
      if (hasUpdated) {
        setLatestData(Array.from(latestData));
      }
    }
  }, [updatedState]);

  useEffect(() => {
    if (isStateValid(createdState, latestData)) {
      let creatingData = false;
      createdState.data.forEach((elem) => {
        const index = latestData.findIndex(entry => entry.id === elem.id);
        if (index === -1) {
          latestData.unshift(elem);
          creatingData = true;
        }
      });

      if (creatingData) {
        setLatestData(Array.from(latestData));
      }
    }
  }, [createdState]);

  useEffect(() => {
    if (isStateValid(removedState, latestData)) {
      let removingData = false;
      removedState.data.forEach((elem) => {
        const index = latestData.findIndex(entry => entry.id === elem.id);
        if (index !== -1) {
          latestData.splice(index, 1);
          removingData = true;
        }
      });

      if (removingData) {
        setLatestData(Array.from(latestData));
      }
    }
  }, [removedState]);

  return useMemo(() => React.cloneElement(children, {
    data: latestData,
    loading,
    error,
    refreshData,
    eventType,
  }), [latestData]);
};

SSEventsContentWrapper.propTypes = {
  fetchData: PropTypes.array.isRequired,
  loading: PropTypes.boolean.isRequired,
  error: PropTypes.object.isRequired,
  refreshData: PropTypes.Function.isRequired,
  eventType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
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