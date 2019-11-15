#Quote Panel
A panel for displaying quote prices

##Sample

```jsx　
<QuotePanel
  dealerName="Dealer two"
  dealerPayedValue={1.75}
  clientName="Client one"
  clientPayedValue={3}
/>
```
##Overriding styles

```jsx
import styled from 'styled-components';

const MyCustomQuotePanel = styled(QuotePanel)`
    background-color: red;
`
```

##Proptypes
```jsx
QuotePanel.propTypes = {
  dealerName: PropTypes.string.isRequired,
  dealerPayedValue: PropTypes.number.isRequired,
  clientName: PropTypes.string.isRequired,
  clientPayedValue: PropTypes.number.isRequired,
};

QuotePanel.defaultProps = {
};
```
