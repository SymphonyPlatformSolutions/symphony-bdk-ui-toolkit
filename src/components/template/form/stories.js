import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Tabs from '../../base/tabs';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Text from '../../base/text';
import Button from '../../base/button';
import Table from '../../base/table';
import {
  Card, FormBox, FormGroup, Label, LabelText,
} from '../../index';
import {
  InputController,
  DropdownHandler,
  CheckboxController,
  EmailController,
  RadioController,
} from '../../base/form-box/stories';

const FormPage = () => (
  <Box vertical space={10} style={{ width: '100%' }}>
    <Box>
      <Text type="primary" size="large" isTitle>
        Form container
      </Text>
    </Box>
    <FormBox>
      <FormGroup>
        <InputController
          id="normal-input"
          tooltip="This is intance identity"
          label="Instance Name"
        />
      </FormGroup>
      <FormGroup>
        <EmailController
          id="email-input"
          tooltip="This needs to be pasted on the target integration configuration page"
          label="Webhook callback Uri"
        />
      </FormGroup>
      <FormGroup>
        <InputController
          id="normal-input"
          tooltip="This is the url to the web service you want to integrate with. e.g: www.gitlab.com"
          label="Service URL"
        />
      </FormGroup>
      <FormGroup>
        <InputController
          id="normal-input"
          tooltip="This is the ID that is present in the integration page of the target service"
          label="Client ID"
        />
      </FormGroup>
      <FormGroup>
        <InputController
          type="password"
          id="normal-input"
          tooltip="This is the client secret for the id presented above."
          label="Client Secret"
        />
      </FormGroup>
      <FormGroup>
        <DropdownHandler />
      </FormGroup>
      <FormGroup>
        <Label>Pick a few</Label>
        <CheckboxController />
      </FormGroup>
      <FormGroup disabled>
        <Label>And for this, pick just one</Label>
        <RadioController />
      </FormGroup>
      <Box horizontal justify="flex-end" align="flex-end">
        <Button> Create</Button>
      </Box>
    </FormBox>
  </Box>
);

const Form = () => (
  <Box space={20}>
    <Box horizontal space={60} style={{ maxWidth: '35rem' }}>
      <Card>
        <FormPage />
      </Card>
    </Box>
  </Box>
);

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Form', () => (
    <StoryWrapper p={15}>
      <Form />
    </StoryWrapper>
  ));
