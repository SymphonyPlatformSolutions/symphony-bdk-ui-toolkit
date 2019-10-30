import styled from 'styled-components';
import Box from '../box';
import Text from '../text';
import { THEME_TYPES } from '../../../styles/colors';

const getBadgeColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#E0EBFC'
    : '#B5BACA'
);

const getBadgeBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#C3D5F0'
    : '#596484'
);

const getTextColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#19376B'
    : '#000028'
);

export const BaseBadge = styled(Box)`
  border-radius: 2px;
  padding: 4px 8px;
  background-color: ${props => getBadgeColor(props)};
  border: ${props => `1px solid ${getBadgeBorderColor(props)}`};
  width: fit-content;
`;

export const SideInfo = styled(Text)`
  font-size: 8px;
  margin-right: 4px;
  color: ${props => getTextColor(props)};
`;

export const MainInfo = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${props => getTextColor(props)};
`;

export const IconButton = styled.button`
  padding: 0;
  margin: 1px 0 0 4px;
  border: none;
  background: none;
  color: ${props => getTextColor(props)};
  cursor: pointer;
`;
