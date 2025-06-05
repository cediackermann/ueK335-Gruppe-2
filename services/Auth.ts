import { fetchApi } from "./Api";
import { getValueFor, setValueFor } from "./securestorage";

export async function login(email: string, password: string) {
  const res = await fetchApi<{ accessToken: string }>("login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (res.accessToken) {
    await storeToken(res.accessToken);
  }
  console.log(
    "Login successful, token stored:",
    res.accessToken,
    await getToken()
  );

  return res;
}

async function storeToken(token: string) {
  try {
    await setValueFor("accessToken", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
}

async function getToken(): Promise<string | null> {
  try {
    const token = await getValueFor("accessToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}
