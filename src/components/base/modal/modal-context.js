import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
  modalProps: {},
});

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    component: null,
    props: {},
    showModal: (targetComp, targetCompProps = {}, modalProps = { hasClose: true }) => {
      setModalState({
        ...modalState,
        component: targetComp,
        props: targetCompProps,
        modalProps,
      });
    },
    hideModal: () => setModalState({
      ...modalState,
      props: null,
      component: null,
      modalProps: {},
    }),
  });

  return (
    <ModalContext.Provider value={modalState}>
      { children }
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.array,
};

ModalProvider.defaultProps = {
  children: [],
};

export const ModalConsumer = ModalContext.Consumer;
