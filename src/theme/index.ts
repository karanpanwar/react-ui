import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

const colors = {
    primaryMain: '#fb665C',
    primaryLight: '#ffd3d7',
    primaryDark: '#ff5942',
    secondaryMain: '#2e68c0',
    secondaryLight: '#3d9af4',
    secondaryDark: '#254aa0',
    contrastText: '#fff',
    primaryText: '#272727',
};

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: colors.primaryMain,
            light: colors.primaryLight,
            dark: colors.primaryDark,
            contrastText: colors.contrastText,
        },
        secondary: {
            main: colors.secondaryMain,
            light: colors.secondaryLight,
            dark: colors.secondaryDark,
        },
        text: {
            primary: colors.primaryText,
        },
    },
    typography: {
        fontFamily: 'Noto Sans, sans-serif',
    },
};

const theme = createTheme(themeOptions);

export type { Theme };
export default theme;
