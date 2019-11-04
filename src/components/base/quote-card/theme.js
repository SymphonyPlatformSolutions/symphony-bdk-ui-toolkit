import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

const getQuoteIdColor = ({ id }) => {
  switch (id) {
    case 'A5':
      return '#EC407A';
    case 'B5':
      return '#880E4F';
    case 'C5':
      return '#AB47BC';
    case 'D5':
      return '#4A148C';
    case 'E5':
      return '#42A5F5';
    case 'F5':
      return '#006064';
    case 'G5':
      return '#00BFA5';
    case 'H1':
      return '#E17900';
    case 'I5':
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

export const BaseCard = styled.div`
  display: grid;
  grid-template-columns: 40px auto 56px; 
  grid-template-rows: auto; 
  grid-template-areas:
    "quoteIdArea contentArea menuArea";
`;

export const QuoteIdArea = styled.div`
  grid-area: quoteIdArea;
  background-color: ${props => getQuoteIdColor(props)};
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

export const QuoteIdLabel = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

export const QuoteIdName = styled.span`
  margin-top: 4px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
`;
