# Radio Button
Basic Radio Button

##Sample

```jsx　
<RadioButton 
  checked={isChecked}
  id="my-id"
  groupName="radio-group"
  onChange={() => setChecked(true)}
>My Label</RadioButton>
```
## Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(RadioButton)`
    background-color: red;
`;
```

##Proptypes
```jsx
RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  children: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

RadioButton.defaultProps = {
  checked: false,
  children: undefined,
  onChange: undefined,
  disabled: false,
};
```
