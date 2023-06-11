export function getlocaldata(key) {
  const userdata = localStorage.getItem(key);
  return userdata;
}

export function setlocaldata(key, value) {
  localStorage.setItem(key, value);
}
