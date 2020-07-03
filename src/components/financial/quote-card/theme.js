import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

const menuDarkIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuMDAwMyAxMi44MzM0QzEyLjQ2MDYgMTIuODMzNCAxMi44MzM3IDEyLjQ2MDMgMTIuODMzNyAxMi4wMDAxQzEyLjgzMzcgMTEuNTM5OCAxMi40NjA2IDExLjE2NjcgMTIuMDAwMyAxMS4xNjY3QzExLjU0MDEgMTEuMTY2NyAxMS4xNjcgMTEuNTM5OCAxMS4xNjcgMTIuMDAwMUMxMS4xNjcgMTIuNDYwMyAxMS41NDAxIDEyLjgzMzQgMTIuMDAwMyAxMi44MzM0WiIgZmlsbD0iI0E5QURCNiIgc3Ryb2tlPSIjQTlBREI2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNy44MzMzIDEyLjgzMzRDMTguMjkzNiAxMi44MzM0IDE4LjY2NjcgMTIuNDYwMyAxOC42NjY3IDEyLjAwMDFDMTguNjY2NyAxMS41Mzk4IDE4LjI5MzYgMTEuMTY2NyAxNy44MzMzIDExLjE2NjdDMTcuMzczMSAxMS4xNjY3IDE3IDExLjUzOTggMTcgMTIuMDAwMUMxNyAxMi40NjAzIDE3LjM3MzEgMTIuODMzNCAxNy44MzMzIDEyLjgzMzRaIiBmaWxsPSIjQTlBREI2IiBzdHJva2U9IiNBOUFEQjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTYuMTY2MzQgMTIuODMzNEM2LjYyNjU4IDEyLjgzMzQgNi45OTk2NyAxMi40NjAzIDYuOTk5NjcgMTIuMDAwMUM2Ljk5OTY3IDExLjUzOTggNi42MjY1OCAxMS4xNjY3IDYuMTY2MzQgMTEuMTY2N0M1LjcwNjEgMTEuMTY2NyA1LjMzMzAxIDExLjUzOTggNS4zMzMwMSAxMi4wMDAxQzUuMzMzMDEgMTIuNDYwMyA1LjcwNjEgMTIuODMzNCA2LjE2NjM0IDEyLjgzMzRaIiBmaWxsPSIjQTlBREI2IiBzdHJva2U9IiNBOUFEQjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';

const menuLightIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuMDAwMyAxMi44MzM0QzEyLjQ2MDYgMTIuODMzNCAxMi44MzM3IDEyLjQ2MDMgMTIuODMzNyAxMi4wMDAxQzEyLjgzMzcgMTEuNTM5OCAxMi40NjA2IDExLjE2NjcgMTIuMDAwMyAxMS4xNjY3QzExLjU0MDEgMTEuMTY2NyAxMS4xNjcgMTEuNTM5OCAxMS4xNjcgMTIuMDAwMUMxMS4xNjcgMTIuNDYwMyAxMS41NDAxIDEyLjgzMzQgMTIuMDAwMyAxMi44MzM0WiIgZmlsbD0iIzc1NzU3NSIgc3Ryb2tlPSIjNzU3NTc1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNy44MzMzIDEyLjgzMzRDMTguMjkzNiAxMi44MzM0IDE4LjY2NjcgMTIuNDYwMyAxOC42NjY3IDEyLjAwMDFDMTguNjY2NyAxMS41Mzk4IDE4LjI5MzYgMTEuMTY2NyAxNy44MzMzIDExLjE2NjdDMTcuMzczMSAxMS4xNjY3IDE3IDExLjUzOTggMTcgMTIuMDAwMUMxNyAxMi40NjAzIDE3LjM3MzEgMTIuODMzNCAxNy44MzMzIDEyLjgzMzRaIiBmaWxsPSIjNzU3NTc1IiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTYuMTY2MzQgMTIuODMzNEM2LjYyNjU4IDEyLjgzMzQgNi45OTk2NyAxMi40NjAzIDYuOTk5NjcgMTIuMDAwMUM2Ljk5OTY3IDExLjUzOTggNi42MjY1OCAxMS4xNjY3IDYuMTY2MzQgMTEuMTY2N0M1LjcwNjEgMTEuMTY2NyA1LjMzMzAxIDExLjUzOTggNS4zMzMwMSAxMi4wMDAxQzUuMzMzMDEgMTIuNDYwMyA1LjcwNjEgMTIuODMzNCA2LjE2NjM0IDEyLjgzMzRaIiBmaWxsPSIjNzU3NTc1IiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';

const getQuoteShortCodeColor = ({ colorIndex, theme }) => {
  if (colorIndex >= 0 && colorIndex <= 9) {
    return theme.colors[`misc_${colorIndex}`];
  }
  return theme.colors.white;
};

export const getMenuStyle = (theme) => ({
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

const getTemplateAreas = ({ type, hasMenu }) => {
  const isSmall = type === 'small';
  if (isSmall && hasMenu) {
    return '"quoteShortCodeArea headerArea menuArea" "contentArea contentArea contentArea"';
  }
  if (isSmall) {
    return '"quoteShortCodeArea headerArea headerArea" "contentArea contentArea contentArea"';
  }
  return '"quoteShortCodeArea contentArea menuArea"';
};

export const BaseCard = styled.div`
  display: grid;
  grid-template-columns: 40px auto auto;
  grid-template-rows: ${({ type }) => (type === 'small' ? 'auto auto' : 'auto')};
  grid-template-areas: ${getTemplateAreas};
  background-color: ${({ theme }) => theme.colors.grey_100};
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.grey_200}`};
`;

export const QuoteShortContainer = styled.div`
  grid-area: quoteShortCodeArea;
`;

export const QuoteShortCodeArea = styled.div`
  top: -1px;
  left: -1px;
  height: ${({ type }) => (type === 'small' ? '100%' : 'calc(100% + 2px)')};
  border-radius: ${({ type }) => (type === 'small' ? '4px 0 4px 0' : '4px 0 0 4px')};
  position: relative;
  background-color: ${(props) => getQuoteShortCodeColor(props)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderArea = styled.div`
  grid-area: headerArea;
  padding: 5px;
  box-sizing: border-box;
`;

export const ContentArea = styled.div`
  grid-area: contentArea;
  padding: 16px;
  box-sizing: border-box;
`;

export const MenuArea = styled.div`
  grid-area: menuArea;
  padding: ${({ hasContent }) => (hasContent ? '16px' : '1px')};
  box-sizing: border-box;
  align-items: baseline;
  display: flex;
`;

export const QuoteShortCodeLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.8);
`;

export const QuoteShortCodeName = styled.span`
  margin-top: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
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

export const getMenuIcon = ({ theme }) => (theme.mode === THEME_TYPES.LIGHT ? menuLightIcon : menuDarkIcon);

export const ContextMenuItem = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  background: none;
  text-align: start;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => getContextMenuItemColor(props)};
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.colors.grey_100};
  }
`;
