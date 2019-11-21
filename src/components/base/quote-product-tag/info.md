#Quote Product Tag
A tag for displaying financial product quotes.

The close button only appears when "tagState" is "active". Then, the "onClose" callback is required.

- 

##Sample

```jsx
<QuoteProductTag
  sideInfo="start"
  mainInfo="H0"
/>

<QuoteProductTag
  mainInfo="IRS"
  tagState="active"
  onClose={closeHandler}
/>

<QuoteProductTag
  mainInfo="IRS"
  tagState="error"
/>
```
##Overriding styles

```jsx
import styled from 'styled-components';

const MyCustomQuoteProductTag = styled(QuoteProductTag)`
    background-color: red;
`
```

##Proptypes
```jsx
QuoteProductTag.propTypes = {
  mainInfo: PropTypes.string.isRequired,
  sideInfo: PropTypes.string,
  tagState: PropTypes.oneOf(['default', 'active', 'disabled', 'loading', 'error', 'success', 'removed', 'added']),
  onClose: PropTypes.func,
};

QuoteProductTag.defaultProps = {
  sideInfo: null,
  tagState: 'default',
  onClose: null,
};
```
