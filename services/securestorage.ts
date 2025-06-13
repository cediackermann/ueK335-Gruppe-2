/**
 * @file This module provides utility functions for securely storing and retrieving key-value pairs using Expo's SecureStore.
 * @module SecureStorage
 */
import * as SecureStore from "expo-secure-store";

/**
 * Asynchronously sets a value for a given key in secure storage.
 * If an error occurs during the storage operation, it will be logged to the console.
 *
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to be stored.
 * @returns {Promise<void>} A Promise that resolves when the value has been successfully stored, or rejects if an error occurs.
 */
export async function setValueFor(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error setting value for key ${key}:`, error);
  }
}

/**
 * Asynchronously retrieves a value for a given key from secure storage.
 * If no value is found for the key, a message will be logged to the console.
 * If an error occurs during the retrieval operation, it will be logged to the console.
 *
 * @param {string} key - The key for which to retrieve the value.
 * @returns {Promise<string | null>} A Promise that resolves with the retrieved value (string) or `null` if no value is found or an error occurs.
 */
export async function getValueFor(key: string): Promise<string | null> {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      console.log(`No value found for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error(`Error getting value for key ${key}:`, error);
    return null;
  }
}
