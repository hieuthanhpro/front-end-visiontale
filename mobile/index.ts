/**
 * VisionTale Mobile App - Main Entry Point
 * 
 * This file exports commonly used utilities, types, and services
 * for easy import throughout the application
 */

// Types
export * from './types/index';

// Components
export { Button } from './components/Button';
export { Card } from './components/Card';

// Services
export { projectAPI } from './services/api/projectAPI';
export { entityAPI } from './services/api/entityAPI';

// Stores
export { useProjectStore } from './stores/projectStore';

// Hooks
export { useApi, useAsyncOperation } from './hooks/useApi';

// Constants
export { COLORS, SEMANTIC_COLORS } from './constants/colors';
export { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT } from './constants/spacing';

// Utilities - Formatters
export {
  formatDate,
  formatDateTime,
  formatDuration,
  formatFileSize,
  truncateString,
  capitalize,
  formatEntityType,
  getRelativeTime,
} from './utils/formatters';

// Utilities - Validators
export {
  isValidEmail,
  validatePassword,
  validateProjectName,
  isValidUrl,
  isRequired,
  minLength,
  maxLength,
  inRange,
  isValidFileSize,
} from './utils/validators';
