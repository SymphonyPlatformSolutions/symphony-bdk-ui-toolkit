import styled from 'styled-components';

const WRAPPER_TRANSLATE_X = -25;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  background: #fff;
  transition: opacity 0.2s linear;

  transform: translateX(${WRAPPER_TRANSLATE_X}px);
  border-radius: 8px;
`;
