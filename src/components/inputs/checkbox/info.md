#Checkbox
Basic checkbox

##Sample

```jsx　
<Checkbox onChange={myCallBack}
          checked
          disabled
>My checkbox</Checkbox>
```
##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Checkbox)`
    background-color: red;
`
```

##Proptypes
```jsx
CheckBox.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  disabled: false,
  checked: false,
  children: '',
};
```
