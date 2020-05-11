import React, { useState, useLayoutEffect, useEffect } from 'react';

const THROTTLE = 300;
const VerticalPositioner = (props) => {
  const {
    children, anchorRef, wait = THROTTLE, flyOutSize,
  } = props;
  const [isUp, setIsUp] = useState(true);

  let throttleTimeout = null;

  const callback = () => {
    if (anchorRef && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      if (rect.y > flyOutSize) {
        setIsUp(true);
      } else {
        setIsUp(false);
      }
    }
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = (a) => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(() => callback(a), wait);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (anchorRef.current) {
      callback();
    }
  }, [anchorRef, anchorRef.current]);

  if (!children) {
    return null;
  }
  return <>{React.cloneElement(children, { isUp })}</>;
};

export default VerticalPositioner;
