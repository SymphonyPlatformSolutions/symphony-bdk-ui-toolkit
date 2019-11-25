# Card

Basic Dealer Tag. Takes in its main tag as children, a possible subText, and a closeHandler.

##Sample

```jsx　
<DealerTag closeHandler={handler} subText="Client One with Dealer Two">Bank name</DealerTag>
```

##Proptypes
```jsx
DealerTag.propTypes = {
  children: PropTypes.string.isRequired,
  subText: PropTypes.string,
  closeHandler: PropTypes.func,
};
DealerTag.defaultProps = {
  subText: null,
  closeHandler: null,
};
```
