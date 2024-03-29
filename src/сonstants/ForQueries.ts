//Проверка ответа на ошибку
import {updateToken} from "../services/actions/Registration";
import {setCookie} from "../utils/cookie";

export const checkResponse = (res: Response) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

// базовая строка https запроса
export const requestAddress: string = "https://norma.nomoreparties.space/api";
// базовая строка wss запроса на все заказы
export const urlOrdersAll: string = 'wss://norma.nomoreparties.space/orders/all';
// базовая строка wss запроса на заказы пользователя
export const urlOrdersUser:string = 'wss://norma.nomoreparties.space/orders';


export const getFeedOrder = (orderNumber:string) => {
    return fetch(requestAddress + `/orders/${orderNumber}`)
        .then(checkResponse)
}


// проверка запроса
const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        const res = await fetch(url, options); //делаем запрос
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await updateToken();
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie('token', refreshData.accessToken);
            if(options.headers) {
                options.headers = {Authorization: refreshData.accessToken};
            }
            const res = await fetch(url, options); //вызываем перезапрос данных
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export default fetchWithRefresh;