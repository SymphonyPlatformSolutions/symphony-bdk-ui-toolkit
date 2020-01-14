# Decision Dropdown

A Dropdown component that lets the user navigate through a tree of possible options, ultimately being able to choose one.

## Decision Tree structure

The data to be passed to the component has two basic elements: options, and groups of options.

- **Options** can recursively lead to more options, which leads to menu navigation.
- **Groups** basically fit options into a single menu card.

Option structure:

```jsx
{
  value: 'Internal, unique value. Usually and ID', /* required */
  label: 'Label to rendered as the option', /* required */
  sublabel: 'Small description', /* optional */
  options: ['Array of more options'], /* optional */
}
```

Group structure:

```jsx
{
  title: 'Group title', /* optional */
  subtitle: 'Group description', /* optional */
  emptyMessage: 'Message to show for when the group is empty', /* optional */
  CustomEmptyComponent: <SomeCustomComponent />, /* optional */
  suboptions: ['Array of options'], /* optional */
}
```

## Example
```jsx
const CONTENT = [{
  title: 'Full decision tree',
  subtitle: 'A big example of navigation',
  suboptions: [
    { label: 'Thing 1', value: 'thing1' },
    {
      label: 'Thing 2',
      sublabel: 'With more stuff',
      value: 'thing2',
      options: [
        {
          label: 'Thing 1-A',
          sublabel: '(Has sublevels)',
          options: [
            { label: 'Thing 2-A', value: 'thing2a' },
            { label: 'Thing 2-B', value: 'thing2b' },
          ],
          value: 'thing1a',
        },
        {
          label: 'Thing 1-B',
          sublabel: '(Has sublevels)',
          value: 'thing1b',
          options: [
            {
              title: 'Sub Card Alpha',
              suboptions: [{
                label: 'Alpha 1', value: 'alpha1',
              }, {
                label: 'Alpha 2', value: 'alpha2', sublabel: 'Some more info on alpha 2',
              }, {
                label: 'Alpha 3', value: 'alpha3',
              }],
            },
            {
              suboptions: [{
                label: 'Beta 1', value: 'beta1',
              }],
            },
            {
              subtitle: 'Sub Card Gamma, but only as subtitle',
              suboptions: [{
                label: 'Gamma 1', value: 'gamma1',
              }, {
                label: 'Gamma 2', value: 'gamma2',
              }, {
                label: 'Gamma 3', value: 'gamma3',
              },
              {
                label: 'Gamma 4', value: 'gamma4',
              }],
            },
          ],
        },
        { label: 'Thing 1-C', value: 'thing1c' },
      ],
    }],
},
{
  title: 'More content',
  suboptions: [
    { label: 'Thing A', value: 'thinga' },
    { label: 'Thing B', value: 'thingb' },
    { label: 'Thing C', value: 'thingc' },
  ],
}, {
  title: 'Empty content',
  suboptions: [],
  emptyMessage: 'Dropdown region temporarily under maintenance',
}];

const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <DecisionDropdown onChange={changeChosen} value={chosen} data={CONTENT} />
    </Box>
  );
};
```

## Proptypes
```jsx
DecisionDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorMessage: PropTypes.string,
  clickHandler: PropTypes.func,
  hasBackButton: PropTypes.bool,
  isMulti: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'large']),
  tooltip: PropTypes.string,
};

DecisionDropdown.defaultProps = {
  placeholder: 'Select...',
  hasBackButton: false,
  data: null,
  loading: false,
  disabled: false,
  value: null,
  errorMessage: null,
  clickHandler: () => {},
  isMulti: false,
  size: 'regular',
  tooltip: null,
};
```
