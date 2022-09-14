import { getCookie } from "../../utils/cookie";

export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "aplication.json",
  },
};

//Проверка статуса запроса
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
  );
};

//Запрос ингредиентов
export const getIngredients = () => {
  return fetch(`${api.url}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

//Отправка данных заказа
export const apiPostOrder = (orderData) => {
  return fetch(`${api.url}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: orderData }),
  }).then(checkResponse);
};

//Запрос для авторизации пользователя
export const authorization = (email, password) => {
  return fetch(`${api.url}/auth/login`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

//Запрос для регистрацию пользователя
export const registerUser = (name, email, password) => {
  return fetch(`${api.url}/auth/register`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

//Запрос получения данных о пользователе
export const userData = () => {
  return fetch(`${api.url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
  }).then(checkResponse);
};

//Запрос обновления данных о пользователе
export const updateUser = (name, email, password) => {
  return fetch(`${api.url}/auth/user`, {
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
  }).then(checkResponse);
};

//Запрос для выхода из системы
export const logout = (refreshToken) => {
  return fetch(`${api.url}/auth/logout`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
};


//Запрос обновления токена
export const updateToken = (refreshToken) => {
  return fetch(`${api.url}/auth/token`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
};

//Запрос на восстановлениz пароля пользователя
export const recoveryPassword = (email) => {
  return fetch(`${api.url}/password-reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

//Запрос сброса пароля пользователя 
export const updatePassword = (token, password) => {
  return fetch(`${api.url}/password-reset/reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      token: token,
      password: password,
    }),
  }).then(checkResponse);
};
