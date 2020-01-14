import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import MessageBox from '../message-box';

const AnimationMoveInTop = keyframes`
0% {
  opacity: 0;
  transform: translateY(-7rem);
}

6% {
  opacity: 1;
  transform: translateY(0.7rem);
}

8% {
  transform: translate(0);
}

92% {
  transform: translate(0);
}

94% {
  opacity: 1;
  transform: translateY(0.7rem);
}

100% {
  opacity: 0;
  transform: translateY(-7em);
}
`;

const Animation = css`
  animation: ${AnimationMoveInTop} 5s ease-out 0.2s;
  animation-fill-mode: backwards;
  position: fixed;
`;

const AnimationProvider = styled.div`
  ${Animation}
`;

export const ToastContainer = styled.div`
  margin-top: 1rem;
  display: inherit;
  left: 50%;
  position: absolute;
`;

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
