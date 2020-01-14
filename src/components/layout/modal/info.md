# Modal
Modal component that wraps any Component with a Modal and Overlay that's controlled by a Provider.
It also contains a Danger Confirmation Modal.



## Use

The Modal Provider can be placed anywhere in the Application, but, ideally, it should wrap the application around the Root node.
The ModalRoot Component should be placed ideally immediately after the Provider, to ensure that the Modal will always appear over the Application.

From there, anywhere in the Application can invoke the Modal by using the library's Modal Consumer.

The Modal Consumer will provide ```showModal``` and ```hideModal``` handler functions to be used in your Component.

### ```showModal```

```showModal``` takes in 3 arguments: 
- The Component to be rendered in the Modal
- An object to be passed as props to said Component
- An object to be passed as props to the Modal. This contains a ```hasClose``` key that is set to true if no object is passed

The ```showModal``` function also plugs in the ```hideModal``` function directly, under the hideModal prop, should that be needed.


As an example, see the Samples below.

### Danger Confirmation Modal

The library also provides a modal for confirming deletion and other errors. It can be used by passing a component with it to ```showModal```.

### Samples
Modal Component sample

```jsx
const SampleComponent = ({ hideModal, myProp }) => ( // hideModal is plugged in automatically
  <Box align="center">
    {myProp}
    <Button onClick={hideModal}>Close Modal</Button>
  </Box>
);
```

Danger Confirmation Modal sample

```jsx
const ConfirmationComponent = props => (
  <DangerConfirmationModal
    {...props}
    confirmButtonText="Yes, I'm sure"
    message="Doing this action will permanetly change the way you perceive the universe around you."
    modalTitle="Are you sure?"
    confirmationHandler={() => myConfirmationFunction()}
  />
);
```

Modal Provider Sample

```jsx　
// On application root
<ModalProvider>
  <ModalRoot />
  {/* ... Rest of App ... */}
    <ModalConsumer>
      {context => (
        <Button onClick={() => context.showModal(SampleComponent, { myProp: 'hello' })}>
          Show Modal!
        </Button>
      )}
    </ModalConsumer>
  {/* ...... */}
</ModalProvider>
```

Modal with no close

```jsx
<ModalConsumer> {/* Modal with */}
  {context => (
    <Button onClick={() => context.showModal(SampleComponent, { myProp: 'hello' }, { hasClose: false })}>
      Show Modal without Close!
    </Button>
  )}
</ModalConsumer>
```

##Proptypes
```jsx
DangerConfirmationModal.propTypes = {
  message: PropTypes.string,
  modalTitle: PropTypes.string,
  confirmButtonText: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  confirmationHandler: PropTypes.func.isRequired,
};

DangerConfirmationModal.defaultProps = {
  modalTitle: 'Are you sure?',
  confirmButtonText: 'Yes',
  message: 'This action cannot be undone.',
};
```
