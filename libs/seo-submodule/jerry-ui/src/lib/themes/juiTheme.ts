import { createTheming } from '@callstack/react-theme-provider';

import type { JuiTheme } from './types.juiTheme';

export const juiTheme: JuiTheme = {
  color: {
    GrayscaleBackground: '#F8F9FA',
    GrayscaleOffBlack: '#141D2B',
  },
};

export const defaultTheme = { ...juiTheme};
export type DefaultTheme = typeof defaultTheme;
export const { ThemeProvider, withTheme, useTheme } = createTheming(defaultTheme);
export const tm = (cb) => () => ((fn) => fn(useTheme()))(cb);
