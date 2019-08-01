// import { colors } from '../../../styles/colors';
//
//
// const BORDERCOLOR ({theme, inputState}) = {
//   return {
//   initial: colors.lightgrey,
//   modified: colors.grey,
//   error: colors.caution,
// }};
//
// export const INPUT_FIELD_THEME = (theme, inputState) => {
//   const isFilled = fill === FILL_TYPES.FILLED;
//   if (!theme) {
//     return {};
//   }
//   const selectedTheme = {
//     [THEME_TYPES.LIGHT]: {
//       TEXT_COLOR: isFilled ? colors.white : theme.theme[type],
//       BG_COLOR: isFilled ? theme.theme[type] : 'inherit',
//     },
//     [THEME_TYPES.DARK]: {
//       TEXT_COLOR: isFilled ? colors.white : theme.theme[type],
//       BG_COLOR: isFilled ? theme.theme[type] : 'transparent',
//     },
//   };
//
//   return selectedTheme[theme.mode];
// };
//
//
// const getBorderColor = inputState => BORDERCOLOR[inputState];
// const getWidth = copyInput => (copyInput ? 'calc(100% - 3rem)' : '100%');
//
