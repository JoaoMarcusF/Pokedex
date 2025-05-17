import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      type: Record<string, string>;
      backgroundType: Record<string, string>;
      background: {
        white: string;
        input: string;
        pressedInput: string;
        modal: string;
      };
      text: {
        white: string;
        black: string;
        gray: string;
        number: string;
      };
      height: {
        short: string;
        medium: string;
        tall: string;
      };
      weight: {
        light: string;
        normal: string;
        heavy: string;
      };
    };
  }
}
