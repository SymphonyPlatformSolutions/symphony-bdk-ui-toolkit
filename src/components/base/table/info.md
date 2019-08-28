# Table
A table component that displays all data separated by rows and columns.
It wraps this component:
https://www.npmjs.com/package/react-data-table-component

For further customization, please follow the above documentation,
everything passed to PhoneInputField will be propagated and **override** any prop.

## Sample
```jsx
<Table
  data={DATA}
  columns={COLUMNS}
/>
```
where DATA is an array of objects containing the desired data, and COLUMNS is an array of objects containing how to configure each column of the table. Its use follows that of the wrapped component.

## Proptypes
```jsx
Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

Table.defaultProps = {
  data: null,
  columns: null,
  loading: false,
  emptyMessage: 'You have no content to display!',
};
```
