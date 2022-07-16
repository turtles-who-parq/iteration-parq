import { createTheme } from '@mui/material/styles';

const lightOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#57cdea',
    },
    secondary: {
      main: '#35bd86',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  shape: {
    borderRadius: 12,
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
};

const darkOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#57cdea',
    },
    secondary: {
      main: '#35bd86',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  shape: {
    borderRadius: 12,
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
};

const themeParq = (mode) => {
  return mode === 'light' ? createTheme(lightOptions) : createTheme(darkOptions);
};

export default themeParq;
