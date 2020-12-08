import styled from 'styled-components';

const getTransformForButton = ({ turnLeft, turnHalf, noRotation }) => {
  if (noRotation) {
    return 'rotate(0)';
  }

  if (turnHalf) {
    return 'rotate(180deg)';
  }

  return turnLeft ? 'rotate(90deg)' : 'rotate(-90deg)';
};

const getPositionForButton = ({ isRight, spacing }) => {
  if (isRight) {
    return `right: ${spacing}px;`;
  }

  return `left: ${spacing}px;`;
};

export const ChevronButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: ${getTransformForButton};
  padding: 0;
  margin: 0;

  margin-right: ${({ marginRight }) => marginRight}px;
  margin-left: ${({ marginLeft }) => marginLeft}px;

  position: absolute;
  top: 18px;
  ${getPositionForButton}
`;
