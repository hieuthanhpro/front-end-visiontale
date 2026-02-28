// Color Palette
export const COLORS = {
  // Primary
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1e40af',

  // Secondary
  secondary: '#10b981',
  secondaryLight: '#d1fae5',
  secondaryDark: '#059669',

  // Danger
  danger: '#dc2626',
  dangerLight: '#fee2e2',
  dangerDark: '#b91c1c',

  // Warning
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  warningDark: '#d97706',

  // Neutral
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  white: '#ffffff',
};

// Semantic Colors
export const SEMANTIC_COLORS = {
  background: COLORS.white,
  surface: COLORS.gray[50],
  text: COLORS.gray[900],
  textSecondary: COLORS.gray[600],
  textTertiary: COLORS.gray[500],
  border: COLORS.gray[200],
  divider: COLORS.gray[100],
  success: COLORS.secondary,
  error: COLORS.danger,
  warning: COLORS.warning,
  info: COLORS.primary,
};
