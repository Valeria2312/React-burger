import {TWSData} from "../../types/typesDataProduct";

export const WS_USER_HISTORY_CONNECTION_SUCCESS: "WS_USER_HISTORY_CONNECTION_SUCCESS" =
    "WS_USER_HISTORY_CONNECTION_SUCCESS";
export const WS_USER_HISTORY_CONNECTION_ERROR: "WS_USER_HISTORY_CONNECTION_ERROR" =
    "WS_USER_HISTORY_CONNECTION_ERROR";
export const WS_USER_HISTORY_CONNECTION_CLOSED: "WS_USER_HISTORY_CONNECTION_CLOSED" =
    "WS_USER_HISTORY_CONNECTION_CLOSED";
export const WS_GET_USER_HISTORY_ORDERS: "WS_GET_USER_HISTORY_ORDERS" =
    "WS_GET_USER_HISTORY_ORDERS";

export interface IUserHistoryConnectionSuccess {
    readonly type: typeof WS_USER_HISTORY_CONNECTION_SUCCESS;
}

export interface IUserHistoryConnectionError {
    readonly type: typeof WS_USER_HISTORY_CONNECTION_ERROR;
}

export interface IUserHistoryConnectionClosed {
    readonly type: typeof WS_USER_HISTORY_CONNECTION_CLOSED;
}

export interface IGetUserHistoryOrders {
    readonly type: typeof WS_GET_USER_HISTORY_ORDERS;
    payload: Array<TWSData>;
}

export type TUserHistoryActions =
    | IUserHistoryConnectionSuccess
    | IUserHistoryConnectionError
    | IUserHistoryConnectionClosed
    | IGetUserHistoryOrders;
