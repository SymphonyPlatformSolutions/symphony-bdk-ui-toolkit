#Quote Product Tag
A tag for displaying financial product quotes

##Sample

```jsx　
<QuoteProductTag
  mainInfo="H0"
  sideInfo="start"
  hasCloseButton
  onClose={closeHandler}
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
  hasCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

QuoteProductTag.defaultProps = {
  sideInfo: null,
  hasCloseButton: false,
  onClose: null,
};
```
