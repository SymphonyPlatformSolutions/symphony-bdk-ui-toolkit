# Toaster
Toaster pops out a Message Box from the top of the screen, that lasts 5 seconds.

It consists of a Provider and Consumer, the Provider serving as the anchor point for holding up Message Box, and the Consumer as the Toast's trigger mechanism.

To use, simply consume the context's ```showToast``` function, passing an Object with your ```message``` and Message Box ```type```. An example is provided below.

## Samples

```jsx
{/* Root of project */}
<ToasterProvider>
  {...}
    {/* Inner layer */}
    <ToastConsumer>
      {context => (
        <Button onClick={() => context.showToast({ message: 'My message', type: 'success' })}>Success</Button>
      )}
    </ToastConsumer>
  {...}
</ToasterProvider>
```
