import { createTheme } from '@mui/material/styles';

const darkPalette = {
  primary: {
    main: '#6366f1', // Indigo
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#a855f7', // Purple
    light: '#c084fc',
    dark: '#7e22ce',
    contrastText: '#ffffff',
  },
  background: {
    default: '#070a13', // Deep slate black
    paper: '#0f172a',   // Darker gray-slate
  },
  text: {
    primary: '#f8fafc',
    secondary: '#94a3b8',
  },
  divider: 'rgba(255, 255, 255, 0.08)',
};

const lightPalette = {
  primary: {
    main: '#4f46e5',
    light: '#6366f1',
    dark: '#3730a3',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#7c3aed',
    light: '#a78bfa',
    dark: '#5b21b6',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f8fafc', // near-white
    paper: '#ffffff',
  },
  text: {
    primary: '#0f172a',
    secondary: '#475569',
  },
  divider: 'rgba(2,6,23,0.08)',
};

const baseOptions = {
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '8px 20px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
            boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.45)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#f8fafc',
          '&:hover': {
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.06)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
};

export default function createAppTheme(mode = 'dark') {
  const palette = mode === 'dark' ? { mode: 'dark', ...darkPalette } : { mode: 'light', ...lightPalette };

  // tweak component styles for light mode
  const components = { ...baseOptions.components };
  if (mode === 'light') {
    components.MuiButton.styleOverrides.outlined = {
      borderColor: 'rgba(15, 23, 42, 0.08)',
      color: '#0f172a',
      '&:hover': {
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(99, 102, 241, 0.06)',
      },
    };
    components.MuiPaper.styleOverrides.root = { backgroundColor: '#ffffff' };
    components.MuiCard.styleOverrides.root = {
      backgroundColor: '#ffffff',
      border: '1px solid rgba(2,6,23,0.06)',
      boxShadow: '0 6px 18px 0 rgba(14, 20, 30, 0.04)',
    };
  } else {
    components.MuiPaper.styleOverrides.root = { backgroundColor: '#0f172a' };
    components.MuiCard.styleOverrides.root = {
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    };
  }

  return createTheme({
    ...baseOptions,
    palette,
    components,
  });
}
