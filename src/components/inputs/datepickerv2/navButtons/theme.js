import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  height: 32px;
  font-family: Segoe UI;
  font-size: 12px;
  text-transform: uppercase;
  color: #008eff;
  background: none;
  border: none;
  border-radius: 16px;
  transition: all 0.3s;
  cursor: pointer;

  :hover,
  :active {
    background: rgba(224, 241, 255, 0.5);
  }

  :focused {
    border-radius: none;
  }
`;
