import styled, { keyframes } from 'styled-components';

export const AnimationMoveInTop = keyframes`
0% {
  opacity: 0;
  transform: translateY(-7rem);
}

6% {
  opacity: 1;
  transform: translateY(0.7rem);
}

8% {
  transform: translate(0);
}

92% {
  transform: translate(0);
}

94% {
  opacity: 1;
  transform: translateY(0.7rem);
}

100% {
  opacity: 0;
  transform: translateY(-7em);
}
`;

export const AnimationProvider = styled.div`
  animation: ${AnimationMoveInTop} 5s ease-out 0.2s;
  animation-fill-mode: backwards;
  position: fixed;
`;

export const ToastContainer = styled.div`
  margin-top: 1rem;
  display: inherit;
  left: 50%;
  position: absolute;
  z-index: 10;
`;
