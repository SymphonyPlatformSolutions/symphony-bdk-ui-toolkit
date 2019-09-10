# FormBox
This Component is used to structure forms and space them accordingly. The library provides 3 Components to be used in unison, as a way to better structure the input fields and their labels.

## ```FormBox``` Component

Wraps all children components and spaces them.

### PropTypes
```jsx
FormBox.propTypes = {
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};
FormBox.defaultProps = {
  onSubmit: null,
  disabled: false,
};
```

## ```FormGroup``` Component

Wraps a desired label and Input.

### PropTypes
```jsx
FormGroup.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};
FormGroup.defaultProps = {
  disabled: false,
};
```

## ```Label``` Component

Wraps text with label. The default styled Text (```LabelText```) that is used within is also externalized, for eventual extensions and modifications.

## PropTypes
```jsx
Label.propTypes = {
  children: PropTypes.any.isRequired,
};
```

## Sample
```jsx
<FormBox style={{ width: '32rem' }}>
  <FormGroup>
    <Label htmlFor="normal-input">Normal input</Label>
    <InputField />
  </FormGroup>
  <FormGroup>
    <label htmlFor="normal-input-2">
      <LabelText>Normal input 2 <i>(but now, with custom label!)</i></LabelText>
    </label>
    <InputField id="normal-input-2" />
  </FormGroup>
  <FormGroup>
    <Label>Dropdown input</Label>
    <Dropdown option={OPTIONS} />
  </FormGroup>
  <FormGroup disabled>
    <Label>Disabled input</Label>
    <Checkbox>Checkbox 1</Checkbox> {/* disabled is propagated inside the FormGroup */}
    <Checkbox>Checkbox 2</Checkbox>
  </FormGroup>
</FormBox>
```