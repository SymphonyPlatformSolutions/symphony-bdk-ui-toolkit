import React, { useState } from 'react';
import Toggle from '../index';

export const ToggleController = (props) => {
  const [toggled, setToggle] = useState(true);

  return (
    <Toggle
      {...props}
      toggled={toggled}
      onChange={setToggle}
    />
  );
};

export const ToggleControllerBase = (props) => {
  const [toggled, setToggle] = useState(false);

  return (
    <Toggle
      {...props}
      toggled={toggled}
      onChange={setToggle}
    />
  );
};
