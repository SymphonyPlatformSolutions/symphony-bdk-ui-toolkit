#Tabs
Tabs component, able to handle multiple tabs

##Sample

```jsx　
<Tabs activeTab={1}>
    <div label="Info">
      <Text small>This is a content for Info</Text>
    </div>
    <div label="Settings">
      <Text small>This is a content for Settings</Text>
    </div>
    <div label="Admin" align="right">
      <Text small>This is a content for Admin</Text>
    </div>
</Tabs>
```

##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Tabs)`
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
