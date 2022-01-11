import { lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import Setofont from '../src/theme/fonts/setofont.woff'
export const theme = createTheme({
    palette: {
        primary: {
          main: '#f2d55d',
        },
        secondary: {
          main: '#f6e9bd'
        },
        background: {
          main: '#f2f2f2'
        },
        error: {
          main: '#ec7555'
        },
        warning: {
          main: '#C4C3BE'
        },
        info: {
          main: '#CDDEE8'
        },
        success: {
          main: '#6AC8EE'
        },
        neutral: {
          main: '#f2f2f2'
        },
        default: {
          main: '#ffffff'
        }
    },
    typography: {
      fontFamily: 'Setofont',
      label: {
        fontSize: 16, 
      },
      caption: {
        fontSize: 14, 
      },
      btnLabel: {
        fontSize: 20
      },
      header: {
        fontSize: 32,
      },
      button: {
        fontStyle: 'italic',
      },
      bigLabel: {
        fontSize: 26
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Setofont';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Setofont'), local('Setofont-Regular'), url(${Setofont}) format('woff');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
})