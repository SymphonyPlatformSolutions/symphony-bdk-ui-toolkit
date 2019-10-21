import styled from 'styled-components';
import Box from '../box';
import { THEME_TYPES } from '../../../styles/colors';

export const StoryWrapper = styled(Box)`
  padding: 20px;
  height: 100%;
  background-color: ${({ theme }) => (
    theme.mode === THEME_TYPES.LIGHT
      ? theme.colors.white
      : theme.colors.dark)};
`;
