const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function loginRequest(credentials) {
  return request(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export function registerRequest(details) {
  return request(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

export function checkTokenRequest(token) {
  return request(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
