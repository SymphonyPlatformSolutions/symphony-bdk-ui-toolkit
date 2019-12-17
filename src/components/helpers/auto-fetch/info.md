# Auto Fetch & useAutoFetch

There are two ways of using the auto fetch functionality, either by using a wrapper called
**AutoFetchWrapper** or using a hook called **useAutoFetch** both of them uses the same configuration
object.

##Configuration
The configuration object should follow this strucutre:


```jsx
const autoFetchConfig = {
  endpoint: 'https://reqres.in/api/users',
  params: { page: 2 },
  handleData: results => results.data,
};
```

## Examples:

**Auto Fetch**

- is a  wrapper component that fetches data for you, and injects into the first child component

These are the injected properties:


```jsx
{
  results: PropTypes.array,
  isDataLoading: Proptypes.boolean,
  error: Proptypes.string,
  handleData: Proptypes.Function
}
```

and this is how you use it:


```jsx

const duckDuckGoFetchConfig = {
  endpoint: 'https://api.duckduckgo.com',
  params: { format: 'json', q: null },
  handleData: (results) => results.RelatedTopics,
};


const MyComp = ({results,isDataLoading, error, handleData}) => {
    return (
        ....
    )
}
  ...
  <AutoFetchWrapper config={duckDuckGoFetchConfig}>
    <MyComp />  
</AutoFetchWrapper>
```


**useAutoFetch**

- Alternativaley you may use the **useAutoFetch** hook on existing components if you need to
the usage is quite similar to the wrapper, instea

this is how you use it:

```jsx
const MyComp = () => {
    connst {results,isDataLoading, error, handleData} = useAutoFetch(duckDuckGoFetchConfig);
    return (
        ....
    )
```

##Complex examples

### Search with auto Fetch

```jsx
const SearchExample = ({ data, refreshData }) => {
  const searchFunc = async (searchTerm) => {
    if (!searchTerm) {
      return;
    }

    refreshData({
      params: {
        format: 'json',
        q: encodeURIComponent(searchTerm),
      },
    });
  };
  return (
    <Box>
      <Box type="flat" vertical>
        <Search
          data={data}
          dataLabel="Text"
          placeholder="Search DuckDuckGo..."
          searchHandler={searchFunc}
        />
      </Box>
    </Box>
  );
};

...

<Text isTitle>Search with Auto fetch</Text>
<Box space={60} p="0 16px 0 0">
  <AutoFetchWrapper config={duckDuckGoFetchConfig}>
    <SearchExample />
    </AutoFetchWrapper>
</Box>
```

### table

```jsx
const autoFetchConfig = {
  endpoint: 'https://reqres.in/api/users',
  params: { page: 2 },
  handleData: results => results.data,
};

const COLUMNS_WITH_AUTO_FETCH = [{
  Header: 'Picture',
  tooltip: 'The person picture',
  accessor: 'avatar',
  Cell: row => (
    <img src={row.value} width={32} />
  ),
  width: 100,
}, {
  Header: 'Name',
  tooltip: 'The person Name',
  accessor: 'id',
  Cell: ({ original }) => (
    <Text>{original.first_name} {original.last_name}</Text>
  ),
  width: 150,
}, {
  Header: 'Email address',
  tooltip: 'The person email address',
  accessor: 'email',
}];

...

<Box>
  <Text isTitle>Table with Auto Fetch</Text>
  <Box space={60} p="0 16px 0 0">
    <AutoFetchWrapper config={autoFetchConfig}>
      <Table
        columns={COLUMNS_WITH_AUTO_FETCH}
      />
    </AutoFetchWrapper>
  </Box>
</Box>
```
### Manual Refresh

```jsx
const RefreshExample = ({ data, loading, refreshData }) => {
  const onRefresh = () => {
    refreshData({ params: { page: 1 + Math.round((Math.random() * 1)) } });
  };
  return (
    <Box>
      <Box>
        <Button onClick={onRefresh}>Refresh</Button>
      </Box>
      <Box type="flat" vertical>
        <Table
          loading={loading}
          data={data}
          columns={COLUMNS_WITH_AUTO_FETCH}
        />
      </Box>
    </Box>
  );

...

<Box style={{ width: '50%' }}>
    <Text isTitle>Table with Auto fetch and manual refresh</Text>
    <Box space={60} p="0 16px 0 0">
      <AutoFetchWrapper config={autoFetchConfig}>
        <RefreshExample />
      </AutoFetchWrapper>
    </Box>
</Box>
};
```
## Proptypes


```jsx
AutoFetchWrapper.propTypes = {
  config: PropTypes.shapeOf({
    endpoint: PropTypes.string,
    params: PropTypes.object,
    handleData: PropTypes.Function,
  }).isRequired,
};
```
