#Text
Text Component, supports multiple sizes and theme changes

##Sample

```jsx　
<Text title size="large" underline>Large Title Underline</Text>
<Text title size="small">Small Title</Text>
<Text title size="tiny">Tiny Title</Text>
<Text size="large">Large Text</Text>
<Text size="small">Small Text</Text>
<Text size="small" underline>Small Text Underline</Text>
<Text size="tiny">Tiny Text</Text>
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
Tabs.propTypes = {
  activeTab: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Tabs.defaultProps = {
  activeTab: 0,
};
```
