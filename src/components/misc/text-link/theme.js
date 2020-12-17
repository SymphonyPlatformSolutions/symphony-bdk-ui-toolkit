import styled from 'styled-components';

import Text from '../text';

export const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary_200};
`;
