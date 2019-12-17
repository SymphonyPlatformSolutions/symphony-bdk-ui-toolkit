# SSEEventsListWrapper and SSE Events

The toolbox is currently using this implementation for sse-events: https://github.com/samouss/react-hooks-sse
We strongly suggest reading its documentation. 

We've created a wrapper that automatically fetches a list of data from an
existing endpoint, and then updates this set of data with events coming from an SSE endpoint.

Its a mix of both our useAutoFetch hook with react-hooks-sse functionality, this component handles
all the necessary mutation lifecycle, only triggering re-renders when absolutely necessary.

## Supported Events

This wrapper component, will listen to these 3 events:

 - update 
 - create
 - remove

The update event, updates the current data list with the data that came from the stream, and will add a **updated**
property to that piece of data. So you can take action if necessary upon updates.

The create and remove events, will simply remove or add data to the list if the data that came from the stream have ids
matching the ones on our internal list.

Any other event will not be processed, if you need a custom event, we suggest that you create your own wrapper.

##Configuration
In order to use this wrapper you'll have to provide an SSE Endpoint URl and a useAutoFetch
configuration file, something along these lines:

```jsx
const autoFetchConfig = {
  endpoint: 'https://reqres.in/api/users',
  params: { page: 2 },
  handleData: results => results.data,
};
const sseEndpoint = http://localhost:9999/sse-events;
```

##Injected Properties
These are the injected properties:

```jsx
{
  data: PropTypes.array,
  loading: Proptypes.boolean,
  error: Proptypes.string,
  refreshData: Proptypes.Function
}
```
- **data** is the latest consolidated list of entries, its the sum of the fetch plus all the
events that occourred.
- **loading** is the indication that a regular fetch is being performed, getting the whole list.
- **error** is an object, and carries all the information about any given error during the lifecycle of the component
- **refreshData** is a CallBack function that allows the user to manually refresh the data, fetching it from the provided
endpoint on the autoFetchConfig object.
   
## Examples:

Here's the usage:

```jsx

const autoFetchConfig = {
  endpoint: 'https://reqres.in/api/users',
  params: { page: 2 },
  handleData: results => results.data,
};

const sseEndpoint = http://localhost:9999/sse-events;

const SSEEventsSample = ({
  data, loading, error, refreshData,
}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);  
  }, [data])
  
  return (
    <Table
      data={tableData}
      loading={loading}
      columns={SSE_EVENTS_TABLE_COLUMNS}
    />
  )
};

...
<SSEventsListWrapper
  sseEndpoint={sshEndpoint}
  autoFetchConfig={autoFetchConfig}
>
  <SSEEventsSample />
</SSEventsListWrapper>
```

## Proptypes
```jsx
SSEventsListWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  sseEndpoint: PropTypes.string.isRequired,
  autoFetchConfig: PropTypes.shape({
    endpoint: PropTypes.string,
    params: PropTypes.object,
    handleData: PropTypes.any,
  }).isRequired,
};


```
