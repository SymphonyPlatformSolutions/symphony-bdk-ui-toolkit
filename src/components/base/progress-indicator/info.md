# Progress Indicator

Progress Indicator component, showing in which step a certain multi-step action is.

Simply takes in the number of steps, and which step it's currently on. Can be set horizontally as well.
The length of the Progress Indicator can also be changed, by passing the ```length``` value, as a number prop (in px).

## Sample

```jsx　
<ProgressIndicator
  numberOfSteps={5}
  currentStep={2}
/>
```

## PropTypes
```jsx
ProgressIndicator.propTypes = {
  length: PropTypes.number,
  horizontal: PropTypes.bool,
  numberOfSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

ProgressIndicator.defaultProps = {
  horizontal: false,
  length: 350,
};
```
