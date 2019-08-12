#Button
Button Supports four different types,as well custom ones.

##Samples

```jsx　
<Button size="large" type="primary" fill="filled" onClick={action('clicked')}>
    <span>Primary</span>
</Button>
<Button size="large" type="secondary" fill="filled" onClick={action('clicked')}>
    <span>Secondary</span>
</Button>
<Button size="large" type="danger" fill="filled" onClick={action('clicked')}>
    <span>Danger</span>
</Button>
<Button size="large" type="grey" fill="filled" onClick={action('clicked')}>
    <span>Grey</span>
</Button>
```

##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Button)`
    background-color: red;
`
```

##Proptypes
```jsx
Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'grey', 'submit']),
  size: PropTypes.oneOf(['tiny', 'small', 'large']),
  fill: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: 'primary',
  size: 'large',
  fill: 'filled',
  disabled: false,
  onClick: () => {},
  loading: false,
};
```
