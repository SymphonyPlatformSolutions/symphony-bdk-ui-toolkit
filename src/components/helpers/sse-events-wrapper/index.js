import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const parserListener = setData => e => setData(JSON.parse(e.data));
const onOpenListener = setOpen => e => setOpen(true);
const onErrorListener = (setError, setOpen, setConnecting) => (e) => {
  if (e.readyState == EventSource.CLOSED) {
    setOpen(false);
  } else if (e.readyState == EventSource.CONNECTING) {
    setConnecting(true);
  } else {
    setError(e);
  }
};

const useSSEvents = (
  endpoint, eventType = 'message',
) => {
  const [data, setData] = useState();
  const [isOpen, setOpen] = useState(false);
  const [isConnecting, setConnecting] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const eventSource = new EventSource(endpoint);
    eventSource.addEventListener(eventType, parserListener(setData));
    eventSource.addEventListener('open', onOpenListener(setOpen));
    eventSource.addEventListener('error', onErrorListener(setError, setOpen, setConnecting));

    return () => {
      // on unmount;
      eventSource.removeEventListener(eventType, parserListener);
      eventSource.removeEventListener('open', onOpenListener);
      eventSource.removeEventListener('error', onErrorListener);
    };
  }, []);

  return {
    data,
    isConnecting,
    isOpen,
    error,
  };
};

useSSEvents.propTypes = {
  endpoint: PropTypes.string.isRequired,
  eventType: PropTypes.string,
};

useSSEvents.defaultProps = {
  enventType: 'message',
};

export default useSSEvents;
