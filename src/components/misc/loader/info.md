#Loader
Basic Loading Component

##Sample

```jsx　
<Loader
    size={number('Size: ', 15)}
    color={color('Loader Color: ', '#D50935')} />
```
##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Loader)`
    background-color: red;
`
```

##Proptypes
```jsx
Loader.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(SPINNER_SIZES).map(el => SPINNER_SIZES[el])),
  theme: PropTypes.object.isRequired,
};
```

```jsx
Loader.defaultProps = {
  type: 'v1',
  size: SPINNER_SIZES.REGULAR,
};
```
