# Toggle
Toggle component. Works pretty much like a checkbox.

## Sample

```jsx　
const ToggleComponent = () => {
  const [toggled, setToggle] = useState(true);

  return (
    <Toggle
      toggled={toggled}
      onChange={setToggle}
    />
  );
};
```

##Proptypes
```jsx
Toggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  toggled: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  toggled: false,
  disabled: false,
  color: null,
};
```
