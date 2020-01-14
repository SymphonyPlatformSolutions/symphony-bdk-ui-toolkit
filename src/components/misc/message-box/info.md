# Message Box
A Message Box for displaying errors, success feedback, etc.

It comes in 4 styles: Success, Error, Info and Warning.

## Samples

```jsx
<MessageBox type="success">Success</MessageBox>
<MessageBox type="error">Error</MessageBox>
<MessageBox type="info">Info</MessageBox>
<MessageBox type="warning">Warning</MessageBox>
```

##Proptypes
```jsx
MessageBox.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  hasButton: PropTypes.bool,
  buttonHandler: PropTypes.func,
  style: PropTypes.object,
};

MessageBox.defaultProps = {
  type: 'info',
  hasButton: false,
  buttonHandler: null,
  style: undefined,
};
```
