import React from 'react';
import PropTypes from 'prop-types';

import { FlagContainer } from './theme';
import '../../inputs/phone-input-field/assets/flags.css';

const Flag = ({ countryCode }) => {
  const classes = `flag ${countryCode.toLowerCase()}`;
  return (
    <FlagContainer className="react-tel-input">
      <div className={classes} />
    </FlagContainer>
  );
};

Flag.propTypes = {
  countryCode: PropTypes.string.isRequired,
};

export default Flag;
