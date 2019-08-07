#Checkbox
Basic checkbox

##Sample

```jsx　
<Checkbox onChange={myCallBack}
          disabled
          label="Disabled Unchecked" />
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
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  disabled: false,
  isChecked: false,
  label: '',
};
```
