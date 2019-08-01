import { colors, THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme }) => (theme.mode === THEME_TYPES.LIGHT ? colors.white : theme.theme.grey);
