import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Button } from './theme';

const NavButtons = (props) => {
  const { buttons, onNavigate } = props;

  if (!buttons.length) {
    return <></>;
  }

  return (
    <Wrapper>
      {buttons.map((button) => (
        <Button type="button" onClick={() => onNavigate(button.daysToAdd)}>
          {button.label}
        </Button>
      ))}
    </Wrapper>
  );
};

NavButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      daysToAdd: PropTypes.number.isRequired,
    })
  ).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default NavButtons;
