import React, { useState } from 'react';
import Checkbox from '../index';

export const CheckBoxComponent = (props) => {
  const { children, checked, ...rest } = props;
  const [isChecked, setCheckMark] = useState(checked);

  return (
    <Checkbox
      {...rest}
      checked={isChecked}
      onChange={({ target: { checked } }) => setCheckMark(checked)}
    >{children}
    </Checkbox>
  );
};

export const IndeterminateCheckbox = (props) => {
  const { children, forceIndeterminate, ...rest } = props;
  const [isChecked, setCheckMark] = useState(true);
  const [isIndeterminate, setIndeterminate] = useState(!!forceIndeterminate);
  return (
    <Checkbox
      {...rest}
      indeterminate={isIndeterminate}
      checked={isChecked}
      onChange={() => {
        if (isChecked && isIndeterminate) {
          setIndeterminate(false);
        } else if (!isChecked) {
          setCheckMark(true);
          setIndeterminate(true);
        } else {
          setCheckMark(false);
        }
      }}
    >{children}
    </Checkbox>
  );
};
