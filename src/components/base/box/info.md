# Box
This component is meant to be used as a layout helper. It contains 3 types: ```primary```, ```secondary``` and ```flat```, each of which implies default spacing between the objects inside the Box.
This can be overridden with the ```space``` prop.


## Sample

```jsx　
const boxStyle = {
  width: '100px',
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center',
  fontFamily: '"Lato", sans-serif',
};

<Box style={Object.assign({}, boxStyle)}>
    <span>Child</span>
</Box>
```
## Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Box)`
    background-color: red;
`
```

## Proptypes
```jsx
Box.propTypes = {
  display: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  grow: PropTypes.string,
  space: PropTypes.number,
  bg: PropTypes.string,
  p: PropTypes.number,
  mx: PropTypes.string,
  my: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'flat']),
};
Box.defaultProps = {
  display: 'flex',
  direction: 'flex-column',
  align: 'stretch',
  justify: 'flex-start',
  grow: 'initial',
  space: 0,
  bg: 'inherit',
  p: 0,
  mx: null,
  my: null,
  type: 'primary',
};
```
