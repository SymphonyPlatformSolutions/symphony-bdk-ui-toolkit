import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Toast from '.';

const ToasterContext = createContext({
  props: {},
  showToast: () => {},
});

export const ToasterProvider = ({ children }) => {
  const [toastState, changeToastState] = useState({
    show: false,
    message: '',
    type: '',
    showToast: ({ message, type }) => {
      changeToastState({
        ...toastState,
        show: true,
        message,
        type,
      });
    },
  });

  return (
    <ToasterContext.Provider value={toastState}>
      {toastState.show && (
        <Toast
          hideToast={() => changeToastState({ ...toastState, show: false })}
          type={toastState.type}
        >
          {toastState.message}
        </Toast>
      )}
      {children}
    </ToasterContext.Provider>
  );
};

ToasterProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export const ToasterConsumer = ({ children }) => (
  <ToasterContext.Consumer>
    {context => children(context)}
  </ToasterContext.Consumer>
);

ToasterConsumer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ToasterContext;
