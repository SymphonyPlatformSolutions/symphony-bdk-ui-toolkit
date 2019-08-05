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
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
```
