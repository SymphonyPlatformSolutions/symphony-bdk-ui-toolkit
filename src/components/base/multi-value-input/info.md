# Multi Value Input

A Search typehead component that triggers a sequence of GET requests depending on the values that have been selected.

## Use

The component needs an "Endpoints" prop, that is an array that specifies the GET search/query endpoints. They can be specified either as a fixed string, a callback that returns a string, or a recursive array of the any of the 3.

Endpoints that are specified as an array will be sent to the parent component as an array. Meaning, the values are structured into the array like to follow the endpoints.

For example, if the endpoints are defined as

```javascript
const endpoints = [
  (value, typedTerm) => 'endpoint1',
  (value, typedTerm) => 'endpoint2',
  [
    (value, typedTerm) => 'endpoint3',
    (value, typedTerm) => 'endpoint4',
  ],
  (value, typedTerm) => 'endpoint5',
]
```

then the values (once selected) will follow the structure

```javascript
value = [
  { value: 'value1' },
  { value: 'value2' },
  [
    { value: 'value3' },
    { value: 'value4' },
  ],
  { value: 'value5' },
]
```

This callback will receive two arguments: the current values, and the current typed term.

The GET endpoint is called as soon as either the Value array changes (that is, an option is selected or deleted), or after a debouncing period that follows a typing event in the search input.

### Custom Components
#### ```CustomTag```

You can also pass a custom CustomTag component, for the case of extending the search result tags.

It receives the following props:

```jsx
element = <Object containing value and label>
index = <Index of the element in the value array>
hasClose = <Whether it's the last element in the value array, and can be removed>
removeHandler = <Removal callback>
```
#### ```CustomMenuItem```

For extending the Menu items, you can pass a CustomMenuItem prop.

It receives the following props: 

```jsx
element = <Object containing value and label>
typedTerm = <The current query string>
```

## Example

```jsx
const SearchWrapper = (props) => {
  const [currentdata, setCurrentdata] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

  const endpoints = [
    'http://localhost:9999/food', // Fixed endpoint string
    (value, typedTerm) => `http://localhost:9999/ingredients?food=${value[0].value}`, // Dynamic string depending on value
  ];

  return (
    <Box type="secondary">
      <MultiValueInput
        value={currentValue}
        data={currentdata}
        endpoints={endpoints}
        resultHandler={setCurrentdata}
        itemChooseHandler={newValue => setCurrentValue(newValue)}
      />
    </Box>
  );
};
```

### CustomTag Example

```jsx
const Tag = (props) => {
  const { hasClose, removeHandler, element } = props;

  return (
    <TagContainer>
      <QuoteProductTag
        mainInfo={element.label}
        tagState={hasClose ? 'active' : 'default'}
        onClose={() => removeHandler(element.value)}
      />
    </TagContainer>
  );
};

[...]

// Using the MultiValueInput Component
<MultiValueInput CustomTag={Tag} {...} />
```

## Proptypes
```jsx
MultiValueInput.propTypes = {
  theme: PropTypes.object.isRequired,
  endpoints: PropTypes.array.isRequired,
  itemChooseHandler: PropTypes.object.isRequired,
  debouncePeriod: PropTypes.number,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  size: PropTypes.oneOf(['regular', 'large']),
  noResultsMessage: PropTypes.string,
  CustomMenuItem: PropTypes.node,
  CustomTag: PropTypes.node,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  clearMessage: PropTypes.string,
};

MultiValueInput.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  placeholder: 'Select values...',
  size: 'regular',
  data: null,
  clearMessage: 'reset',
  noResultsMessage: 'No results found',
  CustomMenuItem: null,
  CustomTag: null,
  disabled: false,
  value: [],
};
```
