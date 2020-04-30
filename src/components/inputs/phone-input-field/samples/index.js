import React, { useState } from 'react';
import PhoneInputField from '..';

const PhoneInputController = (props) => {
  const [value, setValue] = useState('');

  return (<PhoneInputField value={value} onChange={setValue} {...props} />);
};

export default PhoneInputController;
