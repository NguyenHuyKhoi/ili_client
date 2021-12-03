import { createTheme } from "@mui/material/styles";
import { grey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
          main: '#0971f1',
          darker: '#053e85',
        },
        neutral: {
          main: grey[400],
          contrastText: '#fff',
        },
      },
})