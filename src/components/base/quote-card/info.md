#Quote Card
A card for displaying quotes

##Sample

```jsx
const panelData = {
  dealerName: 'Dealer two',
  dealerPayedValue: 1.75,
  clientName: 'Client one',
  clientPayedValue: 3,
};

const productData = {
  name: 'IRS',
  currency: 'USD',
  rateIndex: '3M-LIBOR',
  clearingHouse: 'EUREX',
  startDate: 'spot',
  tenorDate: '1y',
  roll: 'IMM',
  size: {
    type: 'DV01', currency: 'USD', value: '3', multiplier: 'k',
  },
  payDirection: 'pay',
};

<QuoteCard
  quoteShortCode="A5"
  colorIndex={1}
  panelData={panelData}
  productData={productData}
  onEdit={handleEdit}
  onCancel={handleCancel}
/>
```
##Overriding styles

```jsx
import styled from 'styled-components';

const MyCustomQuoteCard = styled(QuoteCard)`
    background-color: red;
`
```

##Proptypes
```jsx
QuoteCard.propTypes = {
  quoteShortCode: PropTypes.string.isRequired,
  colorIndex: PropTypes.number.isRequired,
  panelData: PropTypes.object,
  productData: PropTypes.object,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
};

QuoteCard.defaultProps = {
  panelData: null,
  productData: null,
  onEdit: null,
  onCancel: null,
};
```
