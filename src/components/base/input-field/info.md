#InputField
Input field with multiple states.

##Sample

```jsx　
 <InputField
  inputState={inputState}
  value={input}
  onChange={handleInput}
  placeholder="Input here..."
  copyInput />
```
##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(InputField)`
    background-color: red;
`
```

##Proptypes
```jsx
InputField.propTypes = {
  copyInput: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  hasPasswordShow: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'modified', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  hasPasswordShow: true,
  inputState: 'initial',
  type: 'text',
  id: '',
  onChange: undefined,
  onBlur: undefined,
  placeholder: 'Input here...',
  value: '',
};
```
