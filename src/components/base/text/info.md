#Text
Text Component, supports multiple sizes and theme changes

##Sample

```jsx　
<Text type="secondary" title size="large" underline>Large Title Underline</Text>
<Text type="secondary" title size="small">Small Title</Text>
<Text type="secondary" title size="tiny">Tiny Title</Text>
<Text type="secondary" size="large">Large Text</Text>
<Text type="secondary" size="small">Small Text</Text>
<Text type="secondary" size="small" underline>Small Text Underline</Text>
<Text type="secondary" size="tiny">Tiny Text</Text>
```

##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Text)`
    color: red;
`
```

##Proptypes
```jsx
Text.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'info']),
  title: PropTypes.bool,
  size: PropTypes.string,
  px: PropTypes.string,
  py: PropTypes.string,
  mx: PropTypes.string,
  my: PropTypes.string,
  underline: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  title: false,
  px: null,
  py: null,
  mx: null,
  my: null,
  size: 'large',
  underline: false,
  type: 'secondary',
};
```
