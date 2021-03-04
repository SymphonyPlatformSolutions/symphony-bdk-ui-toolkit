// All colors defined in this file are specific for Client 2.0 usage
// The exported THEMES2 object contains however all colors for old THEME object as well
// as all current bdk components base on this old THEME object
// As result, THEMES2 is super set supporting both Symphony Client 1.5 and 2.9
import { THEMES, THEME_TYPES } from './colors';

const GREY_COLORS = {
  scolor_graphite_minus_96: '#F8F8F9',
  scolor_graphite_minus_88: '#EAEBEC',
  scolor_graphite_minus_72: '#CFD0D2',
  scolor_graphite_minus_48: '#A5A8AC',
  scolor_graphite_minus_24: '#7C7F86',
  scolor_graphite: '#525760',
  scolor_graphite_plus_24: '#3E4249',
  scolor_graphite_plus_48: '#2B2D32',
  scolor_graphite_plus_72: '#17181B',
};

const COMMON_THEME_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#EE3D3D',
  yellow: '#F8C43F',
  green: '#5AD269',
  blue: '#008EFF',
  focus: '#85C9FF',
  deep_blue: '#000028',
};

export const THEMES2 = [
  {
    mode: THEME_TYPES.LIGHT,
    colors: {
      ...THEMES[0].colors, // To Remove: this will ensure backward comtability until migration will be fully done
      ...COMMON_THEME_COLORS,
      main: '#000000',
      background: '#FFFFFF',
      // grey levels
      graphite_minus_96: GREY_COLORS.scolor_graphite_minus_96,
      graphite_minus_88: GREY_COLORS.scolor_graphite_minus_88,
      graphite_minus_72: GREY_COLORS.scolor_graphite_minus_72,
      graphite_minus_48: GREY_COLORS.scolor_graphite_minus_48,
      graphite_minus_24: GREY_COLORS.scolor_graphite_minus_24,
      graphite: GREY_COLORS.scolor_graphite,
      graphite_plus_24: GREY_COLORS.scolor_graphite_plus_24,
      graphite_plus_48: GREY_COLORS.scolor_graphite_plus_48,
      graphite_plus_72: GREY_COLORS.scolor_graphite_plus_72,
      // element state colors
      primary_default: '#008EFF',
      primary_hover: '#29A0FF',
      primary_active: '#0077D6',
      primary_disabled: '#E0F1FF',

      secondary_default: '#525760',
      secondary_hover: '#6E7279',
      secondary_active: '#454951',
      secondary_disabled: '#CFD0D2',

      tertiary_default: 'transparent',
      tertiary_hover: '#F9F9FA',
      tertiary_active: '#E3E4E6',
      tertiary_disabled: 'transparent',

      destructive_default: '#EE3D3D',
      destructive_hover: '#F15C5C',
      destructive_active: '#C83333',
      destructive_disabled: '#FDE8E8',

      // elements specific mappings
      btn_graphite_minus_96: GREY_COLORS.scolor_graphite_minus_96,
      btn_graphite_minus_24: GREY_COLORS.scolor_graphite_minus_24,
      btn_graphite: GREY_COLORS.scolor_graphite,
      btn_graphite_plus_72: GREY_COLORS.scolor_graphite_plus_72,
      btn_destructive: '#EE3D3D',

      input_background: COMMON_THEME_COLORS.white,
      input_color: COMMON_THEME_COLORS.black,
      input_border: GREY_COLORS.scolor_graphite_minus_72,
      input_placeholder: GREY_COLORS.scolor_graphite_minus_24,
    },
  },
  {
    mode: THEME_TYPES.DARK,
    colors: {
      ...THEMES[1].colors, // To Remove: this will ensure backward comtability until migration will be fully done
      ...COMMON_THEME_COLORS,
      main: '#FFFFFF',
      background: '#000000',
      // grey levels
      graphite_minus_96: GREY_COLORS.scolor_graphite_plus_72,
      graphite_minus_88: GREY_COLORS.scolor_graphite_plus_48,
      graphite_minus_72: GREY_COLORS.scolor_graphite_plus_24,
      graphite_minus_48: GREY_COLORS.scolor_graphite,
      graphite_minus_24: GREY_COLORS.scolor_graphite_minus_24,
      graphite: GREY_COLORS.scolor_graphite_minus_48,
      graphite_plus_24: GREY_COLORS.scolor_graphite_minus_72,
      graphite_plus_48: GREY_COLORS.scolor_graphite_minus_88,
      graphite_plus_72: GREY_COLORS.scolor_graphite_minus_96,
      // element state colors
      primary_default: '#008EFF',
      primary_hover: '#29A0FF',
      primary_active: '#0077D6',
      primary_disabled: '#00335C',

      secondary_default: '#CFD0D2',
      secondary_hover: '#D7D8D9',
      secondary_active: '#AEAFB0',
      secondary_disabled: '#3A3A3B',

      tertiary_default: 'transparent',
      tertiary_hover: '#2C2E2F',
      tertiary_active: '#232528',
      tertiary_disabled: 'transparent',

      destructive_default: '#EE3D3D',
      destructive_hover: '#F15C5C',
      destructive_active: '#C83333',
      destructive_disabled: '#561616',

      // elements specific mappings
      btn_graphite_minus_96: GREY_COLORS.scolor_graphite_plus_72,
      btn_graphite_minus_24: GREY_COLORS.scolor_graphite_minus_48,
      btn_graphite: GREY_COLORS.scolor_graphite_minus_72,
      btn_graphite_plus_72: GREY_COLORS.scolor_graphite_minus_96,
      btn_destructive: '#F15C5C',

      input_background: GREY_COLORS.scolor_graphite_plus_24,
      input_color: GREY_COLORS.scolor_graphite_minus_96,
      input_border: GREY_COLORS.scolor_graphite_minus_48,
      input_placeholder: GREY_COLORS.scolor_graphite_minus_48
    },
  },
];