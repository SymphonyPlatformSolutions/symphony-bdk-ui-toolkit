import styled from 'styled-components';
import Box from '../box';
import Text from '../text';
import { THEME_TYPES } from '../../../styles/colors';
import closeDarkIconPath from '../../../assets/quote-product-tag/tag-close-dark-icon.svg';
import closelightIconPath from '../../../assets/quote-product-tag/tag-close-light-icon.svg';

export const getCloseIconPath = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? closelightIconPath
    : closeDarkIconPath
);

const getTagColor = ({ theme, tagState }) => {
  if (tagState === 'removed') {
    return theme.mode === THEME_TYPES.LIGHT
      ? 'rgba(213, 9, 53, 0.1)'
      : '#FFD0D6';
  }

  if (tagState === 'added') {
    return theme.mode === THEME_TYPES.LIGHT
      ? 'rgba(41, 208, 171, 0.1)'
      : '#C6EFC3';
  }

  return theme.mode === THEME_TYPES.LIGHT
    ? '#E0EBFC'
    : '#E1E3E9';
};

const getTagBorder = ({ theme, tagState }) => {
  if (tagState === 'removed') {
    return theme.mode === THEME_TYPES.LIGHT
      ? '1px solid #D50935'
      : 'none';
  }

  if (tagState === 'added') {
    return theme.mode === THEME_TYPES.LIGHT
      ? '1px solid #29D0AB'
      : 'none';
  }

  return theme.mode === THEME_TYPES.LIGHT
    ? '1px solid #C3D5F0'
    : '1px solid #B5BACA';
};

const getTextDecorator = ({ tagState }) => (
  tagState === 'removed'
    ? 'line-through'
    : 'none'
);

const getTagOpacity = ({ tagState }) => (
  tagState === 'disabled'
    ? '0.25'
    : 'none'
);

const getTextColor = ({ theme, tagState }) => {
  if (tagState === 'removed') {
    return theme.mode === THEME_TYPES.LIGHT
      ? '#D50935'
      : '#C12325';
  }

  if (tagState === 'added') {
    return theme.mode === THEME_TYPES.LIGHT
      ? '#156B58'
      : '#007500';
  }

  return theme.mode === THEME_TYPES.LIGHT
    ? '#19376B'
    : '#000028';
};

export const BaseQuoteTag = styled(Box)`
  border-radius: 2px;
  padding: 4px 8px;
  background-color: ${props => getTagColor(props)};
  border: ${props => getTagBorder(props)};  
  opacity: ${props => getTagOpacity(props)};
  width: fit-content;
  height: 27px;
  box-sizing: border-box;
`;

export const SideInfo = styled(Text)`
  font-size: 8px;
  margin-right: 4px;
  color: ${props => getTextColor(props)};
`;

export const MainInfo = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-decoration: ${props => getTextDecorator(props)};
  color: ${props => getTextColor(props)};
`;

export const IconButton = styled.button`  
  height: 16px;
  width: 16px;
  padding: 0;
  margin-left: 6px;
  margin-bottom: 1px;
  border: none;
  background: none;
  color: ${props => getTextColor(props)};
  cursor: pointer;
`;

export const IconImage = styled.img`
  margin-left: 6px;
  height: 13px;
  width: 13px;
`;
