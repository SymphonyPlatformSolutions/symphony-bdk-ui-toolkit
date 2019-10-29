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
`;

export const MainInfo = styled(Text)`
  font-size: 12px;
  font-weight: bold;
`;

export const IconButton = styled.button`
  padding: 0;
  margin: 1px 0 0 4px;
  border: none;
  background: none;
  color: ${({ theme }) => (theme.colors.textcolor)};
  cursor: pointer;
`;
