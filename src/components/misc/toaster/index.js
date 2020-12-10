import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ToastContainer, AnimationProvider } from './theme';
import MessageBox from '../message-box';

const Toast = (props) => {
  const { children, type, hideToast } = props;

  let currentTimeout;

  useEffect(() => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    currentTimeout = setTimeout(hideToast, 5000);
    return () => clearTimeout(currentTimeout);
  }, [type, children]);

  return (
    <ToastContainer>
      <AnimationProvider>
        <MessageBox
          style={{ maxWidth: '28rem', transform: 'translateX(-50%)' }}
          type={type}
          hasButton
          buttonHandler={hideToast}
        >
          {children}
        </MessageBox>
      </AnimationProvider>
    </ToastContainer>
  );
};

Toast.propTypes = {
  children: PropTypes.string.isRequired,
  hideToast: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
};

Toast.defaultProps = {
  type: 'info',
};

export default Toast;
