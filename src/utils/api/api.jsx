import { getCookie, setCookie } from "../../utils/cookie/cookie";

export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-type": "application/json",
  },
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

//Проверка статуса запроса
export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

//Запрос ингредиентов
export const getIngredients = async () => {
  return await request(`${api.url}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//Отправка данных заказа
export const apiPostOrder = async (orderData) => {
  return await request(`${api.url}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: orderData }),
  });
};

//Запрос для авторизации пользователя
export const authorizationRequest = async (email, password) => {
  return await request(`${api.url}/auth/login`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

//Запрос для регистрациb пользователя
export const registrationUserRequest = async (name, email, password) => {
  return await request(`${api.url}/auth/register`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const getUserDataRequest = async () => {
  return await fetchWithRefresh(`${api.url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
};

//Запрос обновления данных о пользователе
export const updateUserDataRequest = async (email, name, password) => {
  return await fetchWithRefresh(`${api.url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
};

//Запрос для выхода из системы
export const logoutRequest = async () => {
  return await fetch(`${api.url}/auth/logout`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

//Запрос обновления токена
export const updateTokenRequest = async () => {
  return await request(`${api.url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

//Запрос на восстановлениz пароля пользователя
export const recoveryPasswordRequest = async (email) => {
  return await request(`${api.url}/password-reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email.email,
    }),
  });
};

//Запрос сброса пароля пользователя
export const resetPasswordRequest = async (password, token) => {
  return await request(`${api.url}/password-reset/reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify(password, token),
  });
};

//Обновление токена (обертка)
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshToken = await updateTokenRequest();
      if (!refreshToken.success) {
        Promise.reject(refreshToken);
      }
      localStorage.setItem("refreshToken", refreshToken.refreshToken);
      setCookie("accessToken", refreshToken.accessToken);
      options.headers.Authorization = refreshToken.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}