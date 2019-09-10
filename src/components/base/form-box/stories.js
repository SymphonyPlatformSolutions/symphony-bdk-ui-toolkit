import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import FormBox from '.';
import Checkbox from '../checkbox';
import InputField from '../input-field';
import RadioButton from '../radio-button';
import Dropdown from '../dropdown';
import { NoOp } from '../../../utils/helpers';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const InputController = ({ type }) => {
  const [value, changeValue] = useState('');

  return (
    <InputField
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
    <div>
      <Checkbox
        isChecked={chosen.a}
        onChange={() => changeChosen({ ...chosen, a: !chosen.a })}
        label="Whoa dude 1"
      />
      <Checkbox
        isChecked={chosen.b}
        onChange={() => changeChosen({ ...chosen, b: !chosen.b })}
        label="Whoa dude 2"
      />
      <Checkbox
        isChecked={chosen.c}
        onChange={() => changeChosen({ ...chosen, c: !chosen.c })}
        label="Whoa dude 3"
      />
    </div>
  );
};

const EmailController = () => {
  const [value, changeValue] = useState('');
  const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    value,
  );
  const inputState = !checkEmail && value ? 'error' : null;
  return (
    <InputField
      placeholder="Email"
      value={value}
      inputState={inputState}
      errorMessage="Not a valid email"
      onChange={({ target: { value } }) => changeValue(value)}
    />
  );
};

const RadioController = () => {
  const [chosen, changeChosen] = useState('a');

  return (
    <div>
      <RadioButton
        checked={chosen === 'a'}
        groupname="radiogroup"
        onChange={() => changeChosen('a')}
      >
        This one
      </RadioButton>
      <RadioButton
        checked={chosen === 'b'}
        groupname="radiogroup"
        onChange={() => changeChosen('b')}
      >
        This other one
      </RadioButton>
      <RadioButton
        checked={chosen === 'c'}
        groupname="radiogroup"
        onChange={() => changeChosen('c')}
      >
        Actually this one
      </RadioButton>
    </div>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add(
    'Form Box',
    () => (
      <StoryWrapper p={15}>
        <FormBox>
          <div>
            Normal input
            <InputController />
          </div>
          <label>
            Input with Email Validation
            <EmailController />
          </label>
          <label>
            Text area input
            <InputController type="textarea" />
          </label>
          <label>
            Dropdown input
            <DropdownHandler />
          </label>
          <label>
            Pick a few
            <CheckboxController />
          </label>
          <label>
            And for this, pick just one
            <RadioController />
          </label>
        </FormBox>
      </StoryWrapper>
    ),
    {
      notes: {
        markdown: Info,
      },
    },
  );
