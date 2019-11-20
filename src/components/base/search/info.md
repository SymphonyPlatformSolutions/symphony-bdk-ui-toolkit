# Search
A Search typehead component that boasts of debouncing and memoization.

Through callbacks, it triggers a result-filtering function, and saves results based on the same search query.

## Use

To use the component, the parent component must pass the search results through props, with a content label to identify which object key to display in the dropdown menu. If none is provided, the default "label" will be used.

The search query, triggered after a debouncing typing period, is called through the ```searchHandler``` callback, and the results should be triggered by the ```resultHandler``` callback.

## Example

```javascript
const SearchWrapper = () => {
  const [currentContent, setCurrentContent] = useState([]);
  const filterFunc = (searchTerm) => {
    // Function that changes the content results
    setCurrentContent(
      mockData.filter((el) => {
        if (el.label.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
        return false;
      }),
    );
  };

  return (
    <Search
      content={currentContent}
      searchHandler={filterFunc} // called upon typed request
      resultHandler={setCurrentContent} // called upon results
    />
  );
};
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
};
Search.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  contentLabel: 'label',
  placeholder: 'Search...',
  noResultsMessage: 'No results',
  content: [],
  size: 'regular',
};
```
