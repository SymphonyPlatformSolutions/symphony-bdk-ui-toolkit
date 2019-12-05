# Box
This component is meant to be used as a layout helper. It contains 3 types: ```primary```, ```secondary``` and ```flat```, each of which implies default spacing between the objects inside the Box.
This can be overridden with the ```space``` prop.


## Sample

```jsx　
const boxStyle = {
  width: '100px',
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center',
};

<Box style={Object.assign({}, boxStyle)}>
    <span>Child</span>
</Box>
```

##Example seen in Canvas
```jsx
onst ExampleViewport = styled(Box)`
  width: 1000px;
  height: 500px;
`;

const SideBar = styled(Box)`
  width: 200px;
  padding: 10px;
  background-color: ${props => props.theme.colors.oldprimary_400};
`;

const ContentBox = styled(Box)`
  padding: 25px;
  width: -webkit-fill-available;
  background-color: ${props => props.theme.colors.oldprimary_100};
`;

const ContentHeader = styled(Box)`
  padding: 10px;
  background-color: ${props => props.theme.colors.oldprimary_200};
`;

const ContentBody = styled(Box)`
  padding: 10px;
  height: 100%;
  background-color: ${props => props.theme.colors.oldprimary_200};
`;

const VerticalList = styled(Box)`
  height: 100%;
  width: -webkit-fill-available;
  padding: 10px;
  background-color: ${props => props.theme.colors.oldprimary_400};
`;

const InnerVerticalList = styled(VerticalList)`
  height: auto;
  width: -webkit-fill-available;
  padding: 4px;
`;

const HorizontalList = styled(Box)`
  height: 100%;
  width: -webkit-fill-available;
  flex-wrap: wrap;
  padding: 10px;
  background-color: ${props => props.theme.colors.oldprimary_400};
`;

const LeftListElement = styled.div`
  width: 100%;
  height: 100%;
  border: ${props => `1px solid ${props.theme.colors.grey_500}`};
  background-color: ${props => props.theme.colors.misc_18};
`;

const RightListElement = styled(LeftListElement)`
  width: 100px;
  height: 100px;
  border: ${props => `1px solid ${props.theme.colors.grey_500}`};
`;

const RightCenterElement = styled(LeftListElement)`
  width: 100%;
  height: 30px;
`;

const ComplexExample = () => (
  <ExampleViewport type="flat" horizontal>
    <SideBar vertical>
      <Box>
        <img src="https://symphony.com/wp-content/uploads/2019/08/logo-symphony.svg" />
      </Box>
    </SideBar>
    <ContentBox>
      <ContentHeader type="flat" align="center">
        <Text isTitle>Header</Text>
      </ContentHeader>
      <ContentBody horizontal>
        <VerticalList vertical>
          <LeftListElement />
          <LeftListElement />
          <LeftListElement />
          <LeftListElement />
          <LeftListElement />
          <LeftListElement />
        </VerticalList>
        <HorizontalList type="flat" horizontal justify="space-around" align="center">
          <RightListElement />
          <RightListElement />
          <RightListElement />
          <RightListElement />
          <RightListElement />
          <RightListElement />
        </HorizontalList>
        <HorizontalList type="flat" horizontal justify="space-around" align="center">
          <RightListElement />
          <RightListElement />
          <InnerVerticalList vertical>
            <RightCenterElement />
            <RightCenterElement />
            <RightCenterElement />
            <RightCenterElement />
          </InnerVerticalList>
        </HorizontalList>
      </ContentBody>
    </ContentBox>
  </ExampleViewport>
);
```

## Overriding styles
```jsx
import styled from 'styled-components';

const MyCustomButton = styled(Box)`
    background-color: red;
`
```

## Proptypes
```jsx
Box.propTypes = {
  display: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  grow: PropTypes.string,
  space: PropTypes.number,
  bg: PropTypes.string,
  p: PropTypes.number,
  mx: PropTypes.string,
  my: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'flat']),
};
Box.defaultProps = {
  display: 'flex',
  direction: 'flex-column',
  align: 'stretch',
  justify: 'flex-start',
  grow: 'initial',
  space: 0,
  bg: 'inherit',
  p: 0,
  mx: null,
  my: null,
  type: 'primary',
};
```
