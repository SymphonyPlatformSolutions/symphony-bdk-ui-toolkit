import React, { useState } from 'react';
import Toggle from '../index';

export const ToggleComponent = (props) => {
  const [toggled, setToggle] = useState(true);

  return (
    <Toggle
      {...props}
      toggled={toggled}
      onChange={setToggle}
    />
  );
};
