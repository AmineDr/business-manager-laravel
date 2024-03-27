export function getToken() {
  const token = localStorage.getItem('api_token')
  if (token?.length && token.length > 3 && token !== "undefined") {
    return token;
  }
  return null
}

export function setToken(token: string) {
  localStorage.setItem('api_token', token);
}

export function clearToken() {
  localStorage.removeItem('api_token');
}
