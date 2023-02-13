import {IIngredient} from "../types/typesDataProduct";

export const testIngredient: IIngredient = {
    _id: 'test ingredient',
    name: 'n/a',
    type: 'n/a',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    image: 'n/a',
    image_mobile: 'n/a',
    image_large: 'n/a',
    price: 0,
    __v: 0,
    index: 0,
}
export const testIngredientsMove = [
    {...testIngredient},
    {...testIngredient},
    {...testIngredient},
];
export const testOrderNumber = 45321;
export const testBodyRequest = {
    data: [
        {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
        },
        {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
        },
    ],
    success: true,
}
export const testRegUser = {
    name: "Вася",
    email: "dog@ya.ru",
    password: "notAPerson"
}
export const testLoginUser = {
    email: "dog@ya.ru",
    password: "notAPerson"
}
export const testAithUser = {
    name: "Вася",
    email: "dog@ya.ru",
}
export const testUpdateUser = {
    name: "Ира",
    email: "cat@ya.ru",
    password: "notAPerson"
}
export const testDataFeed = {
    success: true,
    orders: [{
        createdAt: "2022-11-29T10:55:23.341Z",
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
        name: "Флюоресцентный бургер",
        number: 31261,
        status: "done",
        updatedAt: "2022-11-29T10:55:24.041Z",
        _id: "6385e51b9b518a001bb8924a",
    },
        {
            createdAt: "2022-11-29T10:57:52.062Z",
            ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6"],
            name: "Краторный бургер",
            number: 31265,
            status: "done",
            updatedAt: "2022-11-29T10:57:52.685Z",
            _id: "6385e5b09b518a001bb8924e",
        },
    ],
    total: 123444,
    totalToday: 2222,
}