/**
 * Validation utilities for form inputs
 */

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export function validatePassword(password: string): {
  isValid: boolean;
  message: string;
} {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }

  return { isValid: true, message: 'Password is valid' };
}

/**
 * Validate project name
 * @param name - Project name to validate
 * @returns Validation result with message
 */
export function validateProjectName(name: string): {
  isValid: boolean;
  message?: string;
} {
  if (!name || name.trim().length === 0) {
    return { isValid: false, message: 'Project name is required' };
  }

  if (name.length < 3) {
    return { isValid: false, message: 'Project name must be at least 3 characters' };
  }

  if (name.length > 100) {
    return { isValid: false, message: 'Project name must not exceed 100 characters' };
  }

  return { isValid: true };
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns True if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate required field
 * @param value - Value to check
 * @returns True if value is not empty, false otherwise
 */
export function isRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validate minimum length
 * @param value - String value
 * @param minLength - Minimum required length
 * @returns True if length is valid, false otherwise
 */
export function minLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Validate maximum length
 * @param value - String value
 * @param maxLength - Maximum allowed length
 * @returns True if length is valid, false otherwise
 */
export function maxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Validate number range
 * @param value - Number value
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if value is in range, false otherwise
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate file size (in bytes)
 * @param sizeInBytes - File size in bytes
 * @param maxSizeInMB - Maximum allowed size in MB
 * @returns True if file size is valid, false otherwise
 */
export function isValidFileSize(sizeInBytes: number, maxSizeInMB: number): boolean {
  return sizeInBytes <= maxSizeInMB * 1024 * 1024;
}
