import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: "#FF8397",
            main: "#FF607B",
            dark: "#FF4866",
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: "#F89F8D",
            main: "#F78770",
            dark: "#F57156",
            contrastText: "#000000"
        }
    },
    typography: {
        fontFamily: "'Nunito', 'sans-serif'"
    }
});

export { theme };