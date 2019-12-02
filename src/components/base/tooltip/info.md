# Tooltip
A small tooltip icon that shows messages both above or below when hovered with the mouse.

## Sample

```jsx　
<Tooltip>A very important message</Tooltip>
<Tooltip bottom>A very important message</Tooltip>
```

## PropTypes

```jsx
oltip.propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  bottom: PropTypes.bool,
  size: PropTypes.number,
};
Tooltip.defaultProps = {
  bottom: false,
  size: 15,
};
```
