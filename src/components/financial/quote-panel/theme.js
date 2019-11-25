import styled from 'styled-components';
import Box from '../../base/box';

export const BasePanel = styled.div`
  display: grid;
  grid-template-columns: auto auto; 
  grid-template-rows: auto auto; 
  grid-template-areas:
    "leftSideHeader rightSideHeader" 
    "leftSideValue rightSideValue"; 
`;

export const LeftSideHeader = styled.span`
  grid-area: leftSideHeader; 
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grey_600};
`;

export const RightSideHeader = styled.span`
  grid-area: rightSideHeader;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grey_600};
`;

export const LeftSideValue = styled(Box)`
  grid-area: leftSideValue;
  margin-top: 4px;
  height: 32px;
  border-radius: 3px 0px 0px 3px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.misc_17};
  background-color: ${({ theme }) => theme.colors.misc_16};
`;

export const RightSideValue = styled(Box)`
  grid-area: rightSideValue;
  margin-top: 4px;
  height: 32px;
  border-radius: 0px 3px 3px 0px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.misc_11};
  background-color: ${({ theme }) => theme.colors.misc_10};
`;
