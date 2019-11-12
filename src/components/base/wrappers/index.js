import styled from 'styled-components';
import Box from '../box';

export const StoryWrapper = styled(Box)`
  padding-top: 20px;
  padding-left: 20px;
  background-color: ${({ theme }) => (
    theme.colors.mainbackground)};
`;
