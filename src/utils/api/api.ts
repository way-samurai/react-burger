import { getCookie, setCookie } from "../cookie/cookie";

export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-type": "application/json",
  },
};

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

//Проверка статуса запроса
export const checkResponse = <T>(res: Response): Promise<T> => {
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
export const apiPostOrder = async (orderData: Array<string>) => {
  return await request(`${api.url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({ ingredients: orderData }),
  });
};

//Запрос для авторизации пользователя
export const authorizationRequest = async (email: string, password: string) => {
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
export const registrationUserRequest = async (name: string, email: string, password: string) => {
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
export const updateUserDataRequest = async (email: string, name: string, password: string) => {
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
export const recoveryPasswordRequest = async (email: {email: string}) => {
  return await request(`${api.url}/password-reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email.email,
    }),
  });
};

//Запрос сброса пароля пользователя
export const resetPasswordRequest = async (password: string, token: any) => {
  return await request(`${api.url}/password-reset/reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify(password, token),
  });
};

//Обновление токена (обертка)
export const fetchWithRefresh = async (url: string, options: RequestInit & any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshToken: any = await updateTokenRequest();
      const accessToken = refreshToken.accessToken.split("Bearer ")[1]; 

      if (!refreshToken.success) {
        Promise.reject(refreshToken);
      }
      localStorage.setItem("refreshToken", refreshToken.refreshToken);
      setCookie("token", accessToken); 
      
      options.headers.Authorization = refreshToken.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}
