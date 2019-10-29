#Quote Badge
A badge for displaying financial quotes

##Sample

```jsx　
<QuoteBadge
  mainInfo="H0"
  sideInfo="start"
  hasCloseButton
  onClose={closeHandler}
/>
```
##Overriding styles

```jsx
import styled from 'styled-components';

const MyCustomQuoteBadge = styled(QuoteBadge)`
    background-color: red;
`
```

##Proptypes
```jsx
QuoteBadge.propTypes = {
  mainInfo: PropTypes.string.isRequired,
  sideInfo: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

QuoteBadge.defaultProps = {
  sideInfo: null,
  hasCloseButton: false,
  onClose: null,
};
```
