import * as SecureStore from "expo-secure-store";

export async function setValueFor(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Value set for key: ${key}`);
  } catch (error) {
    console.error(`Error setting value for key ${key}:`, error);
  }
}

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
