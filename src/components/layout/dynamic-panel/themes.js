import styled, { keyframes } from 'styled-components';
import Text from '../../misc/text';
import { CloseButton } from '../../misc/button/icon-buttons';

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const create = keyframes`
  from {
    width: 0
    min-width: 0;
    padding: 8px 0;
  }
  to {
    width: auto;
    padding: 8px 16px;
    min-width: 40;
  }
`;
export const StyledTab = styled.div`
  padding: 8px 16px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.grey_200 : theme.colors.grey_100)};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  transition: background-color 0.3s;
  min-width: 40px;
  animation-iteration-count: 1;
  opacity: 1;
  animation: ${appear} 0.3s, ${create} 0.3s;
  :hover {
    background-color: ${({ theme, isActive }) => (isActive ? undefined : theme.colors.grey_300)};
  }
`;
export const TabTitle = styled(Text)`
  margin-top: 4px;
  margin-bottom: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const TabTileContainer = styled.div`
  display: flex;
`;
export const TabContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grey_200};
  padding: 16px 16px;
`;
export const TabLineup = styled.div`
  display: flex;
`;
export const AddIcon = styled(CloseButton)`
  transform: rotate(45deg);
  padding: 5px;
  margin-left: 5px;
  outline: none;
`;
export const ExcessIconContainer = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.3s;
`;
export const ExcessEllipsis = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey_100};
  padding: 4px;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  justify-content: center;
  cursor: pointer;
`;
export const ExcessMenuContainer = styled.div`
  position: absolute;
  padding: 8px 6px 8px 8px;
  right: 0;
  top: 14px;
  z-index: 10;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grey_300};
`;
