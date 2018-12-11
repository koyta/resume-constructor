import jwtDecode from "jsonwebtoken/decode";

export const ID_TOKEN = "id_token";

export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
  localStorage.removeItem(ID_TOKEN);
}

export function loadIdToken() {
  return localStorage.getItem(ID_TOKEN);
}

export function decodeUserProfile(idToken) {
  try {
    return jwtDecode(idToken);
  } catch (err) {
    return null;
  }
}

export function loadUserProfile() {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const userProfile = jwtDecode(idToken);
    const now = new Date().getTime() / 1000; // Date().getTime() returns milliseconds.
    // So divide by 1000 to get seconds
    if (now > userProfile.exp) {
      // user profile has expired.
      removeIdToken();
      return null;
    }
    return userProfile;
  } catch (err) {
    return null;
  }
}
