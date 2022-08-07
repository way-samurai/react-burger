export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "aplication.json",
  },
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
  );
};

export const getIngredients = () => {
  return fetch(`${api.url}/ingredients`)
    .then(checkResponse)
};

export const apiPostOrder = (orderData) => {
  return fetch(`${api.url}/orders`, {
    method: "POST",
    body: JSON.stringify({ "ingredients": orderData }),
    headers: { "Content-Type": "application/json" },
  }).then(checkResponse);
};
