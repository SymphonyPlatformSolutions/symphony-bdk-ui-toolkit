import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import menuDarkIconPath from '../../../assets/commons/menu-dark-icon.svg';
import menuLightIconPath from '../../../assets/commons/menu-light-icon.svg';

const getQuoteShortCodeColor = ({ colorIndex, theme }) => {
  if (colorIndex >= 0 && colorIndex <= 9) {
    return theme.colors[`misc_${colorIndex}`];
  }
  return theme.colors.white;
};

export const getMenuStyle = theme => ({
  style: {
    padding: '8px 0',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    border: `1px solid ${theme.colors.grey_200}`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.mainbackground,
  },
});

const getContextMenuItemColor = ({ theme, type }) => {
  if (type === 'primary') {
    return theme.colors.primary_500;
  }

  if (type === 'warn') {
    return theme.colors.error_500;
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
  background-color: ${({ theme }) => theme.colors.grey_100};
  padding: 16px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.grey_200}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey_200}`};
  box-sizing: border-box;
`;

export const MenuArea = styled.div`
  grid-area: menuArea;
  background-color: ${({ theme }) => theme.colors.grey_100};
  padding: 16px;
  border-radius: 0 4px 4px 0;
  border-top: ${({ theme }) => `1px solid ${theme.colors.grey_200}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey_200}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey_200}`};
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
    background: ${({ theme }) => theme.colors.grey_100};
  }
  :focus {
    background: ${({ theme }) => theme.colors.grey_100};
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
    background: ${({ theme }) => theme.colors.grey_100};
  }
`;
