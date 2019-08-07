import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import ModalHeaderTitle from './modal-header-title';
import ModalHeaderClose from './modal-header-close';
import {getBackgroundColor, getBoxShadow} from './theme';

const Modal = (props) => {
  const {
    children, title, isOpened, onClose, width, height, ...rest
  } = props;


  return (
    <span>
      <ModalOverlay isOpened={isOpened} />
      <BaseModal ModalTitle={title} isOpened={isOpened} width={width} height={height} {...rest}>
        <ModalHeaderTitle modalTitle={title} />
        <ModalHeaderClose onClose={onClose} />
        <ModalBody isOpened={isOpened}>{children}</ModalBody>
      </BaseModal>
    </span>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

Modal.defaultProps = {
  title: false,
  isOpened: false,
  width: '80%',
  height: '80%',
};

export default Modal;

const ModalOverlay = styled.span`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.35;
  display: ${p => (p.isOpened ? 'flex' : 'none')}
  z-index: 999;
  transition: all .35s ease;
`;

const BaseModal = styled.div`
  display: flex;
  background-color: ${props => getBackgroundColor(props)};
  border-radius: 0px;
  box-shadow: ${props => getBoxShadow(props)};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${p => (p.isOpened ? p.width : '0%')};
  height: ${p => (p.isOpened ? p.height : '0%')};
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 1000;
  transition: all .35s ease;
`;

const ModalBody = styled.div`
  position: absolute;
  top: 50px;
  left: 0px;
  bottom: 10px;
  right: 0;
  padding: 10px;
  overflow-y: auto;
  visibility: ${p => (p.isOpened ? 'visible' : 'hidden')};
  opacity: ${p => (p.isOpened ? '100' : '0')};
  transition: opacity 3s ease;
`;
