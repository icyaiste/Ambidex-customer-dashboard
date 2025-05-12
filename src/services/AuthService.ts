export async function checkIsAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch(
      `${window.env.VITE_REACT_APP_BACKEND_URL}/auth/info`,
      {
        credentials: "include",
      },
    );

    if (response.ok) {
      await response.json();
      return true; // HTTP 200 (OK) means the user is authenticated
    } else {
      return false;
    }
  } catch (error) {
    console.error("There has been an error", error);
    return false;
  }
}

export function signIn(): void {

  const redirectUrl = `${window.env.VITE_REACT_APP_BACKEND_URL}/MicrosoftIdentity/Account/SignIn/OpenIdConnect?redirectUri=${encodeURIComponent(
    "/auth/redirect",
  )}`;
  window.location.href = redirectUrl;
}

export async function signOut(): Promise<void> {
    const signOutUrl = `${window.env.VITE_REACT_APP_BACKEND_URL}/MicrosoftIdentity/Account/SignOut`;
    window.location.href = signOutUrl;
}
