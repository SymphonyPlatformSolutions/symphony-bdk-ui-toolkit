import styled from 'styled-components';
import Box from '../box';
import { THEME_TYPES } from '../../../styles/colors';

export const StoryWrapper = styled(Box)`
  margin-top: 20px;
  margin-left: 20px;
  background-color: ${({ theme }) => (
    theme.mode === THEME_TYPES.LIGHT
      ? theme.colors.white
      : theme.colors.dark)};
`;
