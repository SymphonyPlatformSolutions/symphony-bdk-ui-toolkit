import styled from 'styled-components';
import Box from '../box';

export const StoryWrapper = styled(Box)`
  padding: 20px;
  height: 100%;
  background-color: ${({ theme }) => (
    theme.colors.mainbackground)};
`;
