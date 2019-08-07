#Card
Basic card with hover properties

##Sample

```jsx　
<Card title="Card with title">
  <Text size="small">Lorem ipsum dolor</Text>
</Card>
<Card>
  <Text size="small">Card without title</Text>
</Card>
```
##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Card)`
    background-color: red;
`
```

##Proptypes
```jsx
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  title: '',
};

```
