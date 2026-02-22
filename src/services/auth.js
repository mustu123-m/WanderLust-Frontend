const BASE_URL=import.meta.env.VITE_BASE_URL;
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data)
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data)
  });
  
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });
  return res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: "include"
  });
  return res.json();
};
