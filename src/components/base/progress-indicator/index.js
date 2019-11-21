import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../text';

const SET_HEIGHT = 350;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  position: static;
`;
const ProgressButton = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transition: background-color 0.4s cubic-bezier(1,.02,.41,.37);
    background-color: ${({ theme, activated }) => (activated ? theme.colors.primary_500 : theme.colors.grey_300)};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
`;
const ButtonRing = styled.div`
  width: ${({ show }) => (show ? 32 : 0)}px;
  height: ${({ show }) => (show ? 32 : 0)}px;
  transition: all 0.3s cubic-bezier(1,.02,.41,.37);
  background-color: ${({ theme }) => theme.colors.mainbackground};
  border: solid 2px ${({ theme }) => theme.colors.primary_500};
  border-radius: 50%;
  z-index: 2;
  position: absolute;
`;
const ButtonText = styled(Text)`
  color: white;
`;
const RingAndButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const BarAndButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};;
  position: static;
  z-index: ${({ index }) => index + 1};
`;
const ProgressBar = styled.div`
  height: ${({ horizontal, length }) => (horizontal ? 2 : length)}px;
  width: ${({ horizontal, length }) => (horizontal ? length : 2)}px;
  background-color: ${({ theme }) => theme.colors.grey_300};
  z-index: 1;
  position: relative;
  &::after {
    z-index: 1;
    transition: all 0.3s ease;
    content: " ";
    width: ${({ length, show, horizontal }) => (horizontal ? (show ? length : '0') : 2)}px;
    height: ${({ length, show, horizontal }) => (horizontal ? 2 : (show ? length : '0'))}px;
    background-color: ${({ theme }) => theme.colors.primary_500};
    display: block;
  }
`;

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
