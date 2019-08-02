import styled from 'styled-components';
import Box from '../Box';
import { THEME_TYPES } from '../../../styles/colors';

export const StoryWrapper = styled(Box)`
  background-color: ${({ theme }) => (
    theme.mode === THEME_TYPES.LIGHT
      ? theme.theme.colors.white
      : theme.theme.colors.dark)};
`;
