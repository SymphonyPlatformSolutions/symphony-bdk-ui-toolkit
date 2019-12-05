# Table
A table component that displays all data separated by rows and columns.
It wraps this component:
https://github.com/tannerlinsley/react-table

For further customization, please follow the above documentation,
everything passed to Table will be propagated and **override** any prop.

## Simple table

### Data:

```jsx
const DATA = [{
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
}, {
  email: '3@domain.com',
  name: 'B',
  link: 'http://b.com',
}, {
  email: '2@domain.com',
  name: 'C',
  link: 'http://c.com',
}, {
  email: '1@domain.com',
  name: 'D',
  link: 'http://d.com',
}];

const COLUMNS = [{
  header: 'Name',
  tooltip: 'The name',
  accessor: 'name',
  width: undefined,
}, {
  header: 'Email',
  accessor: 'email',
  width: undefined,
  tooltip: 'Or some other non-obvious descriptor for your table',
}, {
  header: 'Link',
  accessor: 'link',
  Cell: ({ cell }) => (
    <CellWrapper>
      <TextLink href={cell.value} target="_blank" rel="noopener noreferrer">
        {cell.value}
      </TextLink>
    </CellWrapper>
  ),
  width: undefined,
},
];
```

where DATA is an array of objects containing the desired data, and COLUMNS is an array of objects containing how to configure each column of the table. Its use follows that of the wrapped component.

```jsx
<Table
  data={DATA}
  columns={COLUMNS}
/>
```

## Tooltips and actions

Actions are added as small ellipsis icon, that once clicked, open a floating context menu.
Each item of the menu boasts of the following colors: 
- neutral
- info
- error
- warning
- success

```jsx
const handleTestEdit = (item) => {
  console.log(item);
};

const handleTestDelete = (item) => {
  console.log(item);
};

const DATA_WITH_ACTIONS = [{
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
}, {
  email: '3@domain.com',
  name: 'B',
  link: 'http://b.com',
  actionsMenu: [
    {
      label: 'Edit',
      callback: handleTestEdit,
      type: 'primary',
    },
    {
      label: 'Delete',
      callback: handleTestDelete,
      type: 'danger',
    },
  ],
}, {
  email: '2@domain.com',
  name: 'C',
  link: 'http://c.com',
}, {
  email: '1@domain.com',
  name: 'D',
  link: 'http://d.com',
  actionsMenu: [
    {
      label: 'Edit',
      callback: handleTestEdit,
      type: 'primary',
    },
    {
      label: 'Delete',
      callback: handleTestDelete,
      type: 'danger',
    },
  ],
}];

const COLUMNS_WITH_ACTIONS = [{
  header: 'Name',
  tooltip: 'The name',
  accessor: 'name',
  width: undefined,
}, {
  header: 'Email',
  accessor: 'email',
  width: undefined,
  tooltip: 'Or some other non-obvious descriptor for your table',
}, {
  header: 'Link',
  accessor: 'link',
  Cell: ({ cell }) => (
    <CellWrapper>
      <TextLink href={cell.value} target="_blank" rel="noopener noreferrer">
        {cell.value}
      </TextLink>
    </CellWrapper>
  ),
  width: undefined,
},
{
  sortable: false,
  acessor: null,
  width: 50,
  hasActions: true,
},
];

```
```jsx
<Table
 data={DATA_WITH_ACTIONS}
 columns={COLUMNS_WITH_ACTIONS}
 />
```

## Custom Row Component

You can also pass on a component to render the table row. It is highly advised that you propagate props to it with the ```...rest``` spread, and assign ```children```.

### Example

```jsx
const CustomRow = (props) => {
  const { children, ...rest } = props;
  return (
    <CustomRowStyle {...rest}>
      {children}
    </CustomRowStyle>
  );
};
```

## Search

Search can be activated with the ```searchable``` prop. It's set to false by default.

Once activated, the Table with have a searchbar on top right, that searches text values in all the table data. It has a 300ms debouncing period, and boasts of memoization.

## Proptypes
```jsx
Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
  searchable: PropTypes.bool,
  maxHeight: PropTypes.string,
};

Table.defaultProps = {
  data: null,
  columns: null,
  loading: false,
  searchable: false,
  emptyMessage: 'You have no content to display!',
  maxHeight: null,
};
```
