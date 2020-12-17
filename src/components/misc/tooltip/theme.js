import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  text-align: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  width: 1rem;
  display: flex;
`;

export const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 16px;
  height: 16px;
  z-index: 8;
  color: ${({ theme }) => theme.colors.grey_400};
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.grey_600};
  }
`;

export const Bubble = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.grey_800};
  padding: 0.4rem 1rem;
  line-height: 0.9rem;
  min-width: 10rem;
  max-width: 20rem;
  border-radius: 3px;
  transform: translate(
    -50%,
    ${({ bottom }) => (bottom ? '26px' : 'calc(-100% - 8px)')}
  );
  left: ${({ xPosition }) => `${xPosition + 8}px`};
  top: ${({ yPosition }) => `${yPosition}px`};
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 10;
  text-align: center;

  &::after {
    border-radius: 4px;
    content: ' ';
    position: absolute;
    transform: rotate(45deg);
    left: calc(50% - 2px);
    margin-left: -0.4rem;
    border-width: 0.5rem;
    border-style: solid;
    position: absolute;
    ${({ bottom }) => (bottom ? 'bottom' : 'top')}: ${({ addPercentage }) =>
      `${addPercentage * 3 + 68}%`};
    left: calc(50% - 2px);
    border-color: ${({ theme }) => theme.colors.grey_800};
    z-index: -1;
  }
`;
