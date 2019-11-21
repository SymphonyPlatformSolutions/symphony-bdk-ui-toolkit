# Search
A Search typehead component that boasts of debouncing and memoization.

Through callbacks, it triggers a result-filtering function, and saves results based on the same search query.

## Use

To use the component, the parent component must pass the search results through props, with a content label to identify which object key to display in the dropdown menu. If none is provided, the default "label" will be used.

The search query, triggered after a debouncing typing period, is called through the ```searchHandler``` callback, and the results should be triggered by the ```resultHandler``` callback.

You can also pass in a custom CustomMenuItem Component that overrides the basic <Text> used in the dropdown menu. I takes in the ```item``` it's relative to, and the ```typedTerm```, should it be needed. 

## Example

```javascript
const DuckDuckGoWrapper = () => {
  const [currentContent, setCurrentContent] = useState([]);
  const [chosenResult, setChosenResult] = useState(null);

  // Function that changes the content array
  const searchFunc = async (searchTerm) => {
    if (!searchTerm) {
      setCurrentContent([]);
      return;
    }
    const results = await Axios.get(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(
        searchTerm,
      )}&format=json`,
    );
    const STRING_CUT = 50;
    // Api-specific formatting
    const endResults = results.data.RelatedTopics.map((el) => {
      if (el.Text) {
        return {
          ...el,
          shortened: el.Text.length > STRING_CUT
            ? `${el.Text.slice(0, STRING_CUT)}...`
            : el.Text,
        };
      }
      return {
        ...el.Topics[0],
        shortened: el.Topics[0].Text.length > STRING_CUT
          ? `${el.Topics[0].Text.slice(0, STRING_CUT)}...`
          : el.Topics[0].Text,
      };
    });
    setCurrentContent(endResults);
  };

  return (
    <Box type="secondary">
      <Box horizontal style={{ width: '500px' }}>
        <Search
          placeholder="Search DuckDuckGo..."
          content={currentContent}
          searchHandler={searchFunc}
          contentLabel="shortened"
          resultHandler={setCurrentContent}
          itemChooseHandler={setChosenResult}
        />
      </Box>
      {chosenResult && (
        <ResultCard {...chosenResult} />
      )}
    </Box>
  );
};
```

### Custom MenuItem Example

```jsx
const CustomItem = ({ item }) => (
  <Text
    style={{
      color: '#DEE4E7',
      backgroundColor: '#37474F',
      padding: '4px 6px',
      borderRadius: '3px',
      transition: 'all 0.3s linear',
    }}
  >
    {item.label}
  </Text>
);

[...]

// Using the Search Component
<Search CustomMenuItem={CustomItem} {...} />
```

## Proptypes
```jsx
Search.propTypes = {
  theme: PropTypes.object.isRequired,
  content: PropTypes.array,
  searchHandler: PropTypes.func.isRequired,
  resultHandler: PropTypes.func.isRequired,
  debouncePeriod: PropTypes.number,
  size: PropTypes.oneOf(['regular', 'large']),
  contentLabel: PropTypes.string,
  placeholder: PropTypes.string,
  noResultsMessage: PropTypes.string,
  itemChooseHandler: PropTypes.func.isRequired,
  CustomMenuItem: PropTypes.node,
};
Search.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  contentLabel: 'label',
  placeholder: 'Search...',
  noResultsMessage: 'No results',
  content: [],
  size: 'regular',
  CustomMenuItem: null,
};
```
