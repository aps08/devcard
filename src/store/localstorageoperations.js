export function checkLocalStorageKeys() {
  const hasAccessToken = localStorage.getItem("X-ACCESS-TOKEN");
  const hasXUser = localStorage.getItem("X-USER");

  if (hasAccessToken && hasXUser) {
    return true;
  } else {
    return false;
  }
}

export function getUserType() {
  const usertype = localStorage.getItem("X-USER");
  return usertype;
}

export function getUserToken() {
  const hasAccessToken = localStorage.getItem("X-ACCESS-TOKEN");
  return hasAccessToken;
}

export function setUserType(usertype) {
  const usertype = localStorage.setItem("X-USER", usertype);
}

export function setUserToken(token) {
  const hasAccessToken = localStorage.setItem("X-ACCESS-TOKEN", token);
}
