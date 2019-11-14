import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import menuDarkIconPath from '../../../assets/commons/menu-dark-icon.svg';
import menuLightIconPath from '../../../assets/commons/menu-light-icon.svg';

const getQuoteShortCodeColor = ({ colorIndex }) => {
  switch (colorIndex) {
    case 1:
      return '#EC407A';
    case 2:
      return '#880E4F';
    case 3:
      return '#AB47BC';
    case 4:
      return '#4A148C';
    case 5:
      return '#42A5F5';
    case 6:
      return '#006064';
    case 7:
      return '#00BFA5';
    case 8:
      return '#E17900';
    case 9:
      return '#8C513B';
    default:
      return '#FFFFFF';
  }
};

const getCardColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#F5F5F5'
    : '#232529'
);

const getCardBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#EEEEEE'
    : '#35383E'
);

const getIconButtonHoverColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#F5F5F5'
    : '#232529'
);

const getIconButtonFocusColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? '#EEEEEE'
    : '#35383E'
);

export const getMenuStyle = theme => ({
  style: {
    padding: '8px 0',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    border: `1px solid ${getCardBorderColor({ theme })}`,
    boxSizing: 'border-box',
    backgroundColor:
      theme.mode === THEME_TYPES.DARK ? '#17191C' : theme.colors.white,
  },
});

const getContextMenuItemColor = ({ theme, type }) => {
  if (type === 'primary') {
    return theme.mode === THEME_TYPES.LIGHT
      ? '#0098FF'
      : '#5FB8FF';
  }

  if (type === 'warn') {
    return theme.mode === THEME_TYPES.LIGHT
      ? '#D50935'
      : '#F85959';
  }

  return theme.colors.textcolor;
};

export const BaseCard = styled.div`
  display: grid;
  grid-template-columns: 40px auto 56px; 
  grid-template-rows: auto; 
  grid-template-areas:
    "quoteShortCodeArea contentArea menuArea";
`;

export const QuoteShortCodeArea = styled.div`
  grid-area: quoteShortCodeArea;
  background-color: ${props => getQuoteShortCodeColor(props)};
  border-radius: 4px 0 0 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContentArea = styled.div`
  grid-area: contentArea;
  background-color: ${props => getCardColor(props)};
  padding: 16px;
  border-top: ${props => `1px solid ${getCardBorderColor(props)}`};
  border-bottom: ${props => `1px solid ${getCardBorderColor(props)}`};
  box-sizing: border-box;
`;

export const MenuArea = styled.div`
  grid-area: menuArea;
  background-color: ${props => getCardColor(props)};
  padding: 16px;
  border-radius: 0 4px 4px 0;
  border-top: ${props => `1px solid ${getCardBorderColor(props)}`};
  border-bottom: ${props => `1px solid ${getCardBorderColor(props)}`};
  border-right: ${props => `1px solid ${getCardBorderColor(props)}`};
  box-sizing: border-box;
`;

export const QuoteShortCodeLabel = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

export const QuoteShortCodeName = styled.span`
  margin-top: 4px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    margin-bottom: 4px;
  }
  > *:not(:last-child) {
    margin-right: 4px;
  }
`;

export const IconButton = styled.button`
  height: 24px;
  width: 24px;
  padding: 1px 1px 0 0;
  border: none;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  :hover {
    background: ${props => getIconButtonHoverColor(props)};
  }
  :focus {
    background: ${props => getIconButtonFocusColor(props)};
  }
`;

export const getMenuIconPath = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? menuLightIconPath
    : menuDarkIconPath
);

export const ContextMenuItem = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  background: none;
  text-align: start;
  font-size: 14px;
  font-weight: bold;
  color: ${props => getContextMenuItemColor(props)};
  cursor: pointer;
  :hover {
    background: ${props => getIconButtonHoverColor(props)};
  }
`;
