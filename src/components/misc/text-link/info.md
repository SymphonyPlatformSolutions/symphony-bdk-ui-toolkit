# Text Link
Link Component, supports the same functionalities as the Text Component.

## Sample

```jsx　
<TextLink type="secondary" href="https://symphony.com"isTitle size="large" underline>Large Title Underline</Text>
<TextLink type="secondary" href="https://symphony.com"isTitle size="small">Small Title</Text>
<TextLink type="secondary" href="https://symphony.com"isTitle size="tiny">Tiny Title</Text>
<TextLink type="secondary" href="https://symphony.com"size="large">Large Text</Text>
<TextLink type="secondary" href="https://symphony.com"size="small">Small Text</Text>
<TextLink type="secondary" href="https://symphony.com"size="small" underline>Small Text Underline</Text>
<TextLink type="secondary" href="https://symphony.com"size="tiny">Tiny Text</Text>
```

## Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(TextLink)`
  color: red;
`
```
