#Box
This is Flag component, given a country code, it will display a flag.
Refer to this list:
https://www.nationsonline.org/oneworld/country_code_list.htm
use alpha 2 coding

##Sample

```jsx　
<Flag countryCode="us" />
```
##Overriding styles
```jsx
import styled from 'styled-components';

const MyCustoFlag = styled(Flag)`
    transform: scale(1.5);
`
```

##Proptypes
```jsx
Flag.propTypes = {
  countryCode: PropTypes.string.isRequired,
};
```
