import * as Crypto from "expo-crypto";

/**
 * Generates a random UUID using Expo Crypto
 * This is the recommended approach for React Native with Expo
 */
export const generateUniqueId = (): string => {
  return Crypto.randomUUID();
};

/**
 * Generates a shorter random ID for cases where UUID might be too long
 * @param length - Length of the generated ID (default: 8)
 */
export const generateShortId = (length: number = 8): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomBytes = Crypto.getRandomBytes(length);

  for (let i = 0; i < length; i++) {
    result += chars.charAt(randomBytes[i] % chars.length);
  }

  return result;
};

/**
 * Generates a prefixed ID useful for different entity types
 * @param prefix - String prefix for the ID (e.g., 'goal', 'action', 'user')
 * @param useShortId - Whether to use short ID instead of UUID (default: false)
 */
export const generatePrefixedId = (
  prefix: string,
  useShortId: boolean = false
): string => {
  const id = useShortId ? generateShortId() : generateUniqueId();
  return `${prefix}_${id}`;
};

// Example usage:
// generateUniqueId() → "123e4567-e89b-12d3-a456-426614174000"
// generateShortId() → "aBc3dEf7"
// generatePrefixedId('goal') → "goal_123e4567-e89b-12d3-a456-426614174000"
// generatePrefixedId('action', true) → "action_aBc3dEf7"
