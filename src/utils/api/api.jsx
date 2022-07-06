export const api = {
  url: "https://norma.nomoreparties.space/api/ingredients",
  headers: {
    "Content-Type": "aplication.json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } 
  return Promise.reject(
    `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
  );
};

export const getIngredients = () => {
  return fetch(`${api.url}`)
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};
