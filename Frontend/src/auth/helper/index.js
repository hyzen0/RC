import { API } from "../../backend";

export const register = user => {
  return fetch(`${API}/api/auth/register`, {
    mehtod: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const login = user => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  return fetch(`${API}/api/auth/login`, {
    method: "POST",
    body: FormData,
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const logout = next => {
  const userId = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");

    return fetch(`${API}/api/auth/logout/${userId}`, {
      method: "GET",
    })
      .then(res => {
        console.log("Logout Sucess");
        next();
      })
      .catch(err => console.log(err));
  }
};
