import * as muistyles from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    backgroundImage?: {
      light: string;
      dark: string;
      main: string;
      darker: string;
    };
    timeIndicator?: string;
    timeIndicatorGridHighlighter?: string;
  }

  interface PaletteOptions {
    status?: {
      danger?: string;
    };
    backgroundImage?: {
      light: string;
      dark: string;
      main: string;
      darker: string;
    };
    timeIndicator?: string;
    timeIndicatorGridHighlighter?: string;
  }
}
