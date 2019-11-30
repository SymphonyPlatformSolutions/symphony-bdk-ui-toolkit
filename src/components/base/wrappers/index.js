import styled from 'styled-components';
import Box from '../box';

export const StoryWrapper = styled(Box)`
  padding: 20px 20px 40px 20px;
  height: auto;
  background-color: ${({ theme }) => (
    theme.colors.mainbackground)};
`;
