import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #eaebec;
  border-radius: 4px;
  border: none;
  padding: 4px 8px;
  &:hover {
    background-color: #cfd0d2;
  }
`;

export const TextWrapper = styled.span`
  max-width: ${({ maxWidth }) => (maxWidth ? '80px' : 'none')};
  font-size: 12px;
  line-height: 16px;
  color: #17181b;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const IconWrapper = styled.span`
  margin-left: 8px;
  cursor: pointer;
`;
