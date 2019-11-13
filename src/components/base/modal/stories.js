import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ModalRoot, { DangerConfirmationModal } from '.';
import Box from '../box';
import Button from '../button';
import Text from '../text';
import Info from './info.md';
import { StoryWrapper } from '../wrappers';
import { ModalConsumer, ModalProvider } from './modal-context';

const SampleModal = ({ hideModal }) => (
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

const Confirmation = props => (
  <DangerConfirmationModal
    {...props}
    confirmButtonText="Yes, I'm sure"
    message="Doing this action will permanetly change the way you perceive the universe around you."
    modalTitle="Are you sure?"
    confirmationHandler={action('Confirmed')}
  />
);

storiesOf('Base', module).add(
  'Modal',
  () => React.createElement(() => (
    <ModalProvider>
      <ModalRoot />
      <StoryWrapper p={15}>
        <Box>
          <Text isTitle>Large Title Modal</Text>
          <Box horizontal>
            <Box type="secondary">
              <Text isTitle size="small">Empty</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      titleSize: 'large',
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
            <Box type="secondary">
              <Text isTitle size="small">Filled</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      titleSize: 'large',
                      filledTitle: true,
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
            <Box type="secondary">
              <Text isTitle size="small">No Close</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      titleSize: 'large',
                      filledTitle: true,
                      hasClose: false,
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
          </Box>
          <Text isTitle>Regular Title Modal</Text>
          <Box horizontal>
            <Box type="secondary">
              <Text isTitle size="small">Empty</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
            <Box type="secondary">
              <Text isTitle size="small">Filled</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      filledTitle: true,
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
            <Box type="secondary">
              <Text isTitle size="small">No Close</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      filledTitle: true,
                      hasClose: false,
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
          </Box>
          <Text isTitle>Small Title Modal</Text>
          <Box horizontal>
            <Box type="secondary">
              <Text isTitle size="small">Empty</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      titleSize: 'small',
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
            <Box type="secondary">
              <Text isTitle size="small">Filled</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      titleSize: 'small',
                      filledTitle: true,
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
            <Box type="secondary">
              <Text isTitle size="small">No Close</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      modalTitle: 'My modal',
                      titleSize: 'small',
                      filledTitle: true,
                      hasClose: false,
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
          </Box>
          <Text isTitle>No Title Modal</Text>
          <Box horizontal>
            <Box type="secondary">
              <Text isTitle size="small">Close</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {})}>
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
            <Box type="secondary">
              <Text isTitle size="small">No Close</Text>
              <Box horizontal>
                <ModalConsumer>
                  {context => (
                    <Button onClick={() => context.showModal(SampleModal, {}, {
                      hasClose: false,
                    })}
                    >
                      Show Modal!
                    </Button>
                  )}
                </ModalConsumer>
              </Box>
            </Box>
          </Box>
          <Box type="secondary">
            <Text isTitle>Danger Modal</Text>
            <Box horizontal>
              <ModalConsumer>
                {context => (
                  <Button onClick={() => context.showModal(Confirmation)}>
                    Show Danger Modal!
                  </Button>
                )}
              </ModalConsumer>
            </Box>
          </Box>
        </Box>
      </StoryWrapper>
    </ModalProvider>
  )),
  {
    notes: {
      markdown: Info,
    },
  },
);
