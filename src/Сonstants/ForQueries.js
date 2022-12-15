//Проверка ответа на ошибку
export const CheckResponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));
// строка запроса
export const requestAddress = "https://norma.nomoreparties.space/api";