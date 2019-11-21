import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  ProgressContainer,
  ProgressButton,
  ButtonRing,
  ButtonText,
  RingAndButton,
  BarAndButton,
  ProgressBar,
} from './theme';

const SET_HEIGHT = 350;

const ProgressIndicator = (props) => {
  const {
    horizontal, numberOfSteps, currentStep, length,
  } = props;

  if (numberOfSteps <= 0) {
    return null;
  }
  const barLength = (length - 28 * numberOfSteps) / (numberOfSteps - 1);

  return (
    <ProgressContainer horizontal={horizontal}>
      {Array(numberOfSteps)
        .fill()
        .map((l, index) => (
          <BarAndButton index={numberOfSteps - index} horizontal={horizontal}>
            {index !== 0 && (
              <ProgressBar horizontal={horizontal} show={currentStep >= index} length={barLength} />
            )}
            <RingAndButton>
              <ButtonRing show={currentStep === index} />
              <ProgressButton activated={currentStep >= index} key={`progressbutton_${index + 1}`}>
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
