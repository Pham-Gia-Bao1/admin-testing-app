const ACCESS_TOKEN = "__token__";

export const saveToken = (data) => {
  const { token } = data;
  setStorage(ACCESS_TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export function getAccessToken() {
  return getStorage(ACCESS_TOKEN);
}

const setStorage = (storageName, value) => {
  localStorage.setItem(storageName, value);
};

export const getStorage = (storageName) => {
  localStorage.getItem(storageName);
};
