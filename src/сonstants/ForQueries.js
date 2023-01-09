//Проверка ответа на ошибку
import {updateToken} from "../services/actions/Registration";
import {getCookie, setCookie} from "../utils/cookie";

export const checkResponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));
// строка запроса
export const requestAddress = "https://norma.nomoreparties.space/api";

const fetchWithRefresh = async (url, options) => {
    try {
        console.log('проверка на наличие ошибки');

        const res = await fetch(url, options); //делаем запрос
        return await checkResponse(res);

    } catch (err) {
        if (err.message === "jwt expired") {
        // if(!err.success) {
            console.log('выполнене условия на наличие ошибки')

                let refreshData = await updateToken(); //обновляем токен

            console.log(refreshData);

            //     const authToken = refreshData.accessToken.split('Bearer ')[1]
            // // console.log(authToken);
            //     const refreshToken = refreshData.refreshToken
            // // console.log(refreshToken);
            //     setCookie('token', authToken)
            //     localStorage.setItem('refreshToken', refreshToken)
            //
            // console.log("здесь куки аксес токен из ошибки" + getCookie('token'))
            // console.log("Здесь рефреш токен из ошибки" + localStorage.getItem('refreshToken'))
            //
            // options.headers.authorization = authToken;

            const newToken = getCookie('token')
            console.log(newToken);
            options.headers.Authorization = 'Bearer ' + newToken;

                const res = await fetch(url, options); //вызываем перезапрос данных
            console.log(res)
                return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


export default fetchWithRefresh;