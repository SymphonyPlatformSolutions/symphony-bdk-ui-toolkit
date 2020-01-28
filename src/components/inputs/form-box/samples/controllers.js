import React, { useState } from 'react';
import Checkbox from '../../checkbox';
import InputField from '../../input-field';
import RadioButton from '../../radio-button';
import Dropdown from '../../dropdown';
import Box from '../../../layout/box';

export const InputController = ({ type, ...rest }) => {
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

export const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Dropdown options={OPTIONS} value={chosen} onChange={changeChosen} {...props} />
  );
};

export const CheckboxController = () => {
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

export const EmailController = (rest) => {
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

export const RadioController = ({ disabled }) => {
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
