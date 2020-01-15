#Nav Tabs
Tabs component, able to handle multiple tabs
 - Static
 - Self adjusted
 - LTR support

##Sample

```jsx　
<NabTabs activeTab={1}>
    <div label="Info">
      <Text small>This is a content for Info</Text>
    </div>
    <div label="Settings">
      <Text small>This is a content for Settings</Text>
    </div>
    <div label="Admin" align="right">
      <Text small>This is a content for Admin</Text>
    </div>
</NabTabs>
```

##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(NavTabs)`
    color: red;
`
```

##Proptypes
```jsx
NavTabs.propTypes = {
  activeTab: PropTypes.number,
  children: PropTypes.node.isRequired,
};

NavTabs.defaultProps = {
  activeTab: 0,
};
```
