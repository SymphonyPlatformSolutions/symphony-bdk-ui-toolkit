import styled from 'styled-components';
import Box from '../box';
import Text from '../text';
import { THEME_TYPES } from '../../../styles/colors';

const getTextColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#757575'
    : '#A9ADB6'
);

const getLeftSideColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#E0EBFC'
    : '#8FAEE7'
);

const getLeftSideTextColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#19376B'
    : '#341670'
);

const getRightSideColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#F3E5F5'
    : '#CE93D8'
);

const getRightSideTextColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#4A148C'
    : '#49148C'
);

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
  color: ${props => getTextColor(props)};
`;

export const RightSideHeader = styled.span`
  grid-area: rightSideHeader;
  font-size: 10px;
  color: ${props => getTextColor(props)};
`;

export const LeftSideValue = styled(Box)`
  grid-area: leftSideValue;
  margin-top: 4px;
  height: 32px;
  border-radius: 3px 0px 0px 3px;
  font-size: 14px;
  font-weight: bold;
  color: ${props => getLeftSideTextColor(props)};
  background-color: ${props => getLeftSideColor(props)};
`;

export const RightSideValue = styled(Box)`
  grid-area: rightSideValue;
  margin-top: 4px;
  height: 32px;
  border-radius: 0px 3px 3px 0px;
  font-size: 14px;
  font-weight: bold;
  color: ${props => getRightSideTextColor(props)};
  background-color: ${props => getRightSideColor(props)};
`;
