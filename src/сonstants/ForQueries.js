//Проверка ответа на ошибку
import {updateToken} from "../services/actions/Registration";
import {setCookie} from "../utils/cookie";

export const checkResponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));
// строка запроса
export const requestAddress = "https://norma.nomoreparties.space/api";

const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options); //делаем запрос
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
                const refreshData = await updateToken(); //обновляем токен
                const authToken = refreshData.accessToken.split('Bearer ')[1]
                const refreshToken = refreshData.refreshToken
                setCookie('token', authToken)
                localStorage.setItem('refreshToken', refreshToken)
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options); //вызываем перезапрос данных
                return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export default fetchWithRefresh;