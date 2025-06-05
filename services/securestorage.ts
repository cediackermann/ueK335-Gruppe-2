import * as SecureStore from "expo-secure-store";

export const storeAuthToken = async (token: string) => {
  await SecureStore.setItemAsync("accessToken", token);
};

export async function getValueFor(key: string): Promise<string | null> {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log(`No value found for key: ${key}`);
    return null;
  }
}
