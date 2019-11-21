import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {
  ProgressContainer,
  ProgressButton,
  ButtonRing,
  ButtonText,
  RingAndButton,
  BarAndButton,
  ProgressBar,
  PROGRESS_BUTTON_SIZE,
} from './theme';

const SET_HEIGHT = 350;

const ProgressIndicator = (props) => {
  const {
    horizontal, numberOfSteps, currentStep, length,
  } = props;
  const [buttonIDs] = useState(Array(numberOfSteps).fill().map(() => uuid.v1()));
  if (numberOfSteps <= 0) {
    return null;
  }
  const barLength = (length - PROGRESS_BUTTON_SIZE * buttonIDs.length) / (buttonIDs.length - 1);

  return (
    <ProgressContainer horizontal={horizontal}>
      {buttonIDs.map((el, index) => (
        <BarAndButton index={buttonIDs.length - index} horizontal={horizontal}>
          {index !== 0 && (
          <ProgressBar horizontal={horizontal} show={currentStep >= index} length={barLength} />
          )}
          <RingAndButton>
            <ButtonRing show={currentStep === index} />
            <ProgressButton activated={currentStep >= index} key={el}>
              <ButtonText size="small">{index + 1}</ButtonText>
            </ProgressButton>
          </RingAndButton>
        </BarAndButton>
      ))}
    </ProgressContainer>
  );
};

ProgressIndicator.propTypes = {
  length: PropTypes.number,
  horizontal: PropTypes.bool,
  numberOfSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

ProgressIndicator.defaultProps = {
  horizontal: false,
  length: SET_HEIGHT,
};

export default withTheme(ProgressIndicator);
