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

export function setLocalStorage(data) {
  localStorage.setItem("X-USER", data["X-USER"]);
  localStorage.setItem("X-ACCESS-TOKEN", data["X-ACCESS-TOKEN"]);
}

export function removeLocalstorage() {
  localStorage.removeItem("X-USER");
  localStorage.removeItem("X-ACCESS-TOKEN");
}
