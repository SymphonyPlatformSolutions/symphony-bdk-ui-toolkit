# Phone Input Field
This is an International Phone number Input, with the ability to choose a particular
country from a list, providing a country code for it.
It wraps this component:
https://github.com/bl00mber/react-phone-input-2

Please for further customization please follow the above documentation,
everything passed to PhoneInputField will be propagated and **override** any prop.

## Sample
```jsx
 <PhoneInputField
  inputState={inputStates}
  disabled={isDisabled}
  value={input}
  onChange={handleInput}
 />
```
## Overriding styles
```jsx
const overrides = {
  container: 'react-tel-input',
  formControl: 'form-control',
  flagDropdownButton: 'flag-dropdown',
  searchHover: 'selected-flag',
  flag: 'flag',
  selectedFlag: 'selected-flag',
  flagDropdownMenu: 'country-list',
};

import styled from 'styled-components';

const MyCustomButton = styled(PhoneInputField).attrs(overrides)`
  .${overrides.container) {
    background-color: red;
  }
`;  
```

## Proptypes
```jsx
PhoneInputField.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  disableAreaCodes: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasSearchField: PropTypes.bool,
};

PhoneInputField.defaultProps = {
  disabled: false,
  inputState: 'initial',
  id: '',
  placeholder: 'Input here...',
  value: '',
  onChange: NoOp,
  onBlur: NoOp,
  defaultValue: 'us',
  disableAreaCodes: true,
  errorMessage: 'Something went wrong!',
  hasSearchField: false,
};
```
