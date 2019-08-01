import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { GoAlert } from 'react-icons/go';
import styled from 'styled-components';
import Modal from '.';
import Box from '../Box';
import Button from '../Button';
import Text from '../Text';
import { colors, THEME_TYPES } from '../../../styles/colors';


const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;


storiesOf('Base', module)
  .add('Modal', () => React.createElement(() => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const handleModalClick = () => {
      setIsModalOpened(true);
    };
    const onModalClose = () => {
      setIsModalOpened(false);
    };
    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const handleConfirmClick = () => {
      setIsConfirmOpened(true);
    };
    const onConfirmClose = () => {
      setIsConfirmOpened(false);
    };
    const onConfirmOK = () => {
      setIsConfirmOpened(false);
    };
    const onConfirmCancel = () => {
      setIsConfirmOpened(false);
    };
    const commandBarStyle = {
      marginTop: '20px',
      marginLeft: '5px',
    };
    const iconStyle = {
      lineHeight: '32px',
      fontSize: '32px',
      color: colors.orange,
      marginLeft: '10px',
    };
    return (
      <StoryWrapper p={15}>
        <Box space={20}>
          <Text title size="large">Modal</Text>
          <Box align="flex-start">
            <Button onClick={handleModalClick}>Open Modal...</Button>
          </Box>
          <Modal title="This is a Modal" isOpened={isModalOpened} onClose={onModalClose}>
            <Box horizontal>
              <Text>Content of the Modal</Text>
            </Box>
          </Modal>
        </Box>
        <Box space={20}>
          <Text title size="large">Confirmation</Text>
          <Box align="flex-start">
            <Button onClick={handleConfirmClick}>Open Confirmation...</Button>
          </Box>
          <Modal title="Confirmation" isOpened={isConfirmOpened} onClose={onConfirmClose} width="600px" height="185px">
            <Box vertical>
              <Box horizontal align="center">
                <GoAlert style={iconStyle} />
                <Text>Do you confirm your action?</Text>
              </Box>
              <Box horizontal align="flex-start" style={commandBarStyle}>
                <Button type="system" fill="filled" onClick={onConfirmOK}>OK</Button>
                <Button type="caution" fill="ghost" onClick={onConfirmCancel}>Cancel</Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </StoryWrapper>
    );
  }));
