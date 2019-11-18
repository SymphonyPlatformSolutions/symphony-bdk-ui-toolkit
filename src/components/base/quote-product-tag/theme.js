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
    return theme.colors.misc_12;
  }

  if (tagState === 'added') {
    return theme.colors.misc_13;
  }

  return theme.mode === THEME_TYPES.LIGHT
    ? theme.colors.oldprimary_100
    : theme.colors.secondary_050;
};

const getTagBorder = ({ theme, tagState }) => {
  if (tagState === 'removed') {
    return theme.mode === THEME_TYPES.LIGHT
      ? `1px solid ${theme.colors.error_700}`
      : 'none';
  }

  if (tagState === 'added') {
    return theme.mode === THEME_TYPES.LIGHT
      ? `1px solid ${theme.colors.misc_14}`
      : 'none';
  }

  return theme.mode === THEME_TYPES.LIGHT
    ? `1px solid ${theme.colors.oldprimary_200}`
    : `1px solid ${theme.colors.secondary_100}`;
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
    return theme.colors.error_700;
  }

  if (tagState === 'added') {
    return theme.mode === THEME_TYPES.LIGHT
      ? theme.colors.misc_15
      : theme.colors.success_700;
  }

  return theme.mode === THEME_TYPES.LIGHT
    ? theme.colors.oldprimary_900
    : theme.colors.secondary_900;
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
