import React from 'react';
import Box from '../../box';
import Text from '../../../misc/text';
import Button from '../../../misc/button';
import { DangerConfirmationModal } from '..';

export const SampleModal = ({ hideModal }) => (
  <Box align="center">
    <Text>
      This Modal is used to show that you can call a modal from everywhere in
      your application! It uses React Provider and React Consumer to able to so.
      <br />
      Really handy tools indeed...!
    </Text>
    <Box horizontal justify="center">
      <Button onClick={hideModal}>Close Modal</Button>
    </Box>
  </Box>
);

export const Confirmation = props => (
  <DangerConfirmationModal
    {...props}
    confirmButtonText="Yes, I'm sure"
    message="Doing this action will permanetly change the way you perceive the universe around you."
    modalTitle="Are you sure?"
    confirmationHandler={() => console.log('Confirmed')}
  />
);
