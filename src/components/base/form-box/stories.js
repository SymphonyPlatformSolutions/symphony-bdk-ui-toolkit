import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import FormBox, { FormGroup, Label, LabelText } from '.';
import Checkbox from '../checkbox';
import InputField from '../input-field';
import RadioButton from '../radio-button';
import Dropdown from '../dropdown';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';
import Box from '../box';
import Text from '../text';

const InputController = ({ type, ...rest }) => {
  const [value, changeValue] = useState('');

  return (
    <InputField
      {...rest}
      type={type}
      value={value}
      onChange={({ target: { value } }) => changeValue(value)}
    />
  );
};

const OPTIONS = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
  {
    value: 'option3',
    label: 'Option 3',
  },
  {
    value: 'option4',
    label: 'Option 4',
  },
  {
    value: 'option5',
    label: 'Option 5',
  },
];

const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Dropdown options={OPTIONS} value={chosen} onChange={changeChosen} />
  );
};


const CheckboxController = () => {
  const [chosen, changeChosen] = useState({
    a: false,
    b: false,
    c: false,
  });

  return (
    <Box type="flat">
      <Checkbox
        checked={chosen.a}
        onChange={() => changeChosen({ ...chosen, a: !chosen.a })}
      >Option 1
      </Checkbox>
      <Checkbox
        checked={chosen.b}
        onChange={() => changeChosen({ ...chosen, b: !chosen.b })}
      >Option 2
      </Checkbox>
      <Checkbox
        checked={chosen.c}
        onChange={() => changeChosen({ ...chosen, c: !chosen.c })}
      >Option 3
      </Checkbox>
    </Box>
  );
};

const EmailController = (rest) => {
  const [value, changeValue] = useState('');
  const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    value,
  );
  const inputState = !checkEmail && value ? 'error' : null;
  return (
    <InputField
      {...rest}
      placeholder="Email"
      value={value}
      inputState={inputState}
      errorMessage="Not a valid email"
      onChange={({ target: { value } }) => changeValue(value)}
    />
  );
};

const RadioController = ({ disabled }) => {
  const [chosen, changeChosen] = useState('a');

  return (
    <Box type="flat">
      <RadioButton
        checked={chosen === 'a'}
        groupname="radiogroup"
        onChange={() => changeChosen('a')}
        disabled={disabled}
      >
        This one
      </RadioButton>
      <RadioButton
        checked={chosen === 'b'}
        groupname="radiogroup"
        onChange={() => changeChosen('b')}
        disabled={disabled}
      >
        This other one
      </RadioButton>
      <RadioButton
        checked={chosen === 'c'}
        groupname="radiogroup"
        onChange={() => changeChosen('c')}
        disabled={disabled}
      >
        Actually this one
      </RadioButton>
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add(
    'Form Box',
    () => (
      <StoryWrapper p={15}>
        <Box>
          <Text size="large" isTitle>Form Box</Text>
        </Box>
        <FormBox style={{ width: '32rem' }}>
          <FormGroup>
            <Label htmlFor="normal-input">Normal input</Label>
            <InputController id="normal-input" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="normal-input" tooltip="Some piece of relevant info!">Input with tooltip</Label>
            <InputController id="normal-input" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="normal-input-2">
              <LabelText>Normal input 2 <i>(but now, with custom label!)</i></LabelText>
            </label>
            <InputController id="normal-input-2" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email-input">Input with Email Validation</Label>
            <EmailController id="email-input" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="textarea">Text area input</Label>
            <InputController type="textarea" id="textarea" />
          </FormGroup>
          <FormGroup>
            <Label>Dropdown input</Label>
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
        </FormBox>
      </StoryWrapper>
    ),
    {
      notes: {
        markdown: Info,
      },
    },
  );
