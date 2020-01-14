# Data Grid
An Excel-like grid component, that wraps the basic functionalities of 
https://adazzle.github.io/react-data-grid/, but includes the toolbox's own styling and Components.

To facilitate use, the ```data``` prop has been created, and it will act the same way the Table component does, rather than passing in a ```rowGetter```.

Please for further customization please follow the above documentation,
everything passed to DataGrid will be propagated and **override** any prop.

## ```rowGetter``` Sample
```jsx
const columns = [{
  name: 'Name',
  key: 'name',
  editable: true,
}, {
  name: 'Email',
  key: 'email',
  editable: true,
}, {
  name: 'Link',
  key: 'link',
  editable: true,
}];

return (<DataGrid
  columns={columns}
  rowGetter={row => data[row]}
/>);
```

## ```data``` Sample
```jsx
const data = [{
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
  rowId: 1,
}, {
   email: '4@domain.com',
  name: 'A',
  error: { email: true },
  link: 'http://a.com',
  rowId: 2,
}, {
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
  rowId: 3,
}];

return (<DataGrid
  columns={columns}
  data={data}
/>);
```

## Custom cell handler Sample
```jsx
const columns = [{
  name: 'Name',
  key: 'name',
  editable: true,
}, {
  name: 'Email',
  key: 'email',
  editable: true,
}, {
  name: 'Link',
  key: 'link',
  editable: true,
  formatter: row => (<a href={row.value}>{row.value}</a>),
}];

return (<DataGrid
  columns={columns}
  data={data}
/>);
```

## Proptypes
```jsx
DataGrid.propTypes = {
  rowGetter: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  rowsCount: PropTypes.number,
};

DataGrid.defaultProps = {
  rowsCount: null,
  data: null,
  rowGetter: null,
};
```
