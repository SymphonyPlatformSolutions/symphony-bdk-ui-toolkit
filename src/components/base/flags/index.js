import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../phone-input-field/assets/flags.css';

const FlagContainer = styled.div`
  width: 25px !important;
  height: 18px !important;
`;

export default function Flag({ countryCode }) {
  const classes = `flag ${countryCode.toLowerCase()}`;
  return (
    <FlagContainer className="react-tel-input">
      <div className={classes} />
    </FlagContainer>
  );
}

Flag.propTypes = {
  countryCode: PropTypes.string.isRequired,
};
