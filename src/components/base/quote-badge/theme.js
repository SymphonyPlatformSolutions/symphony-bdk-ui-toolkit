import styled from 'styled-components';
import Box from '../box';
import Text from '../text';

export const BaseBadge = styled(Box)`
  border-radius: 2px;
  padding: 4px;
  background-color: ${({ theme }) => (theme.colors.lightgrey)};
  width: fit-content;
`;

export const SideInfo = styled(Text)`
  font-size: 8px;
  margin-right: 4px;
  color: #4d4d4d;
`;

export const MainInfo = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: #4d4d4d;
`;

export const IconButton = styled.button`
  padding: 0;
  margin: 1px 0 0 4px;
  border: none;
  background: none;
  color: #4d4d4d;
  cursor: pointer;
`;
