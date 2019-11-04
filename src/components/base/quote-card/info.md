#Quote Badge
A card for displaying quotes

##Sample

```jsx　
<QuoteCard
  quoteIdName="H1"
  panelData={panelData}
  badges={badges}
  onRemove={handleRemove}
/>
```
##Overriding styles

```jsx
import styled from 'styled-components';

const MyCustomQuoteBadge = styled(QuoteCard)`
    background-color: red;
`
```

##Proptypes
```jsx
QuoteCard.propTypes = {
  quoteIdName: PropTypes.string.isRequired,
  panelData: PropTypes.object,
  badges: PropTypes.array,
  onRemove: PropTypes.func,
};

QuoteCard.defaultProps = {
  panelData: null,
  badges: null,
  onRemove: null,
};
```
