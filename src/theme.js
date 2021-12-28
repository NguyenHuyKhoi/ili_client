import { createTheme } from "@mui/material/styles";
import { grey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
          main: '#0971f1',
          darker: '#053e85',
        },
        neutral: {
          main: '#f2f2f2',
          contrastText: '#f2f2f2',
        },
      },
})