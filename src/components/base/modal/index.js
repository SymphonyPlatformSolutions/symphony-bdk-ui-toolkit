import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import Text from '../text';
import Button from '../button';
import Box from '../box';
import { ModalConsumer } from './modal-context';
import { Overlay, Modal } from './theme';

const Padder = styled.div`
  padding: 28px;
`;

const CloseContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const ModalRoot = ({ theme }) => (
  <ModalConsumer>
    {({
      component: Component, props, modalProps, hideModal,
    }) => (
      <Overlay open={!!Component}>
        <Modal theme={theme} open={!!Component} {...modalProps}>
          {!modalProps || modalProps.hasClose ? (
            <CloseContainer>
              <IconContainer onClick={hideModal}>
                <MdClose size="22px" color={theme.colors.textcolor} />
              </IconContainer>
            </CloseContainer>
          ) : null}
          <Padder>
            {Component ? <Component {...props} hideModal={hideModal} /> : null}
          </Padder>
        </Modal>
      </Overlay>
    )}
  </ModalConsumer>
);

ModalRoot.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ModalRoot);

const ThemelessDangerConfirmationModal = (props) => {
  const {
    message,
    modalTitle,
    hideModal,
    confirmationHandler,
    confirmButtonText,
  } = props;

  return (
    <Box align="center">
      <Text isTitle>{modalTitle}</Text>
      <Text>{message}</Text>
      <Box horizontal>
        <Button
          fill="outlined"
          type="danger"
          onClick={hideModal}
          title="Cancel"
        >
          Cancel
        </Button>
        <Button
          type="danger"
          onClick={confirmationHandler}
          title="Confirm action"
        >
          {confirmButtonText}
        </Button>
      </Box>
    </Box>
  );
};

ThemelessDangerConfirmationModal.propTypes = {
  message: PropTypes.string,
  modalTitle: PropTypes.string,
  confirmButtonText: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  confirmationHandler: PropTypes.func.isRequired,
};

ThemelessDangerConfirmationModal.defaultProps = {
  modalTitle: 'Are you sure?',
  confirmButtonText: 'Yes',
  message: 'This action cannot be undone.',
};

export const DangerConfirmationModal = withTheme(
  ThemelessDangerConfirmationModal,
);
