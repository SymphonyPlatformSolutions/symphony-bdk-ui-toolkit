import { THEMES2 } from '../../styles/colors2';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';

const decoratedThemes2 = THEMES2.map(theme => ({name: theme.mode, ...theme}));

export const theme2Decorator = withThemesProvider(decoratedThemes2);
