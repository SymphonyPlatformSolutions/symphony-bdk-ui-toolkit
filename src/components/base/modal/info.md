#Modal
Modal component, supports header and bottom.

##Sample

```jsx　
<Modal title="Confirmation"
       isOpened={isConfirmOpened}
       onClose={onConfirmClose}
       width="600px"
       height="185px">
  <Box vertical>
      <Box horizontal align="center">
        <GoAlert style={iconStyle} />
        <Text>Do you confirm your action?</Text>
      </Box>
      <Box horizontal align="flex-start" style={commandBarStyle}>
        <Button type="secondary" fill="filled" onClick={onConfirmOK}>OK</Button>
        <Button type="danger" fill="ghost" onClick={onConfirmCancel}>Cancel</Button>
      </Box>
    </Box>
</Modal>
```

##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Modal)`
    background-color: red;
`
```

##Proptypes
```jsx
Modal.propTypes = {
  title: PropTypes.string,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

Modal.defaultProps = {
  title: false,
  isOpened: false,
  width: '80%',
  height: '80%',
};
```
