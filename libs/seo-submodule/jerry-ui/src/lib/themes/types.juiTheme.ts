export interface JuiThemeColor {
  GrayscaleBackground: string;
  GrayscaleOffBlack: string;

}

export type ColorName = keyof JuiThemeColor;

export interface JuiTheme {
  color: JuiThemeColor;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends JuiTheme {}
}
