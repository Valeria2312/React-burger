import {TWSData} from "../../types/typesDataProduct";

export const WS_HISTORY_CONNECTION_SUCCESS: "WS_HISTORY_CONNECTION_SUCCESS" =
    "WS_HISTORY_CONNECTION_SUCCESS";
export const WS_HISTORY_CONNECTION_ERROR: "WS_HISTORY_CONNECTION_ERROR" =
    "WS_HISTORY_CONNECTION_ERROR";
export const WS_HISTORY_CONNECTION_CLOSED: "WS_HISTORY_CONNECTION_CLOSED" =
    "WS_HISTORY_CONNECTION_CLOSED";
export const WS_GET_HISTORY_ORDERS: "WS_GET_HISTORY_ORDERS" =
    "WS_GET_HISTORY_ORDERS";

export interface IConnectionSuccess {
    readonly type: typeof WS_HISTORY_CONNECTION_SUCCESS;
}

export interface IConnectionError {
    readonly type: typeof WS_HISTORY_CONNECTION_ERROR;
}

export interface IConnectionClosed {
    readonly type: typeof WS_HISTORY_CONNECTION_CLOSED;
}

export interface IGetOrders {
    readonly type: typeof WS_GET_HISTORY_ORDERS;
    payload: Array<TWSData>;
}

export type TAllHistoryActions =
    | IConnectionSuccess
    | IConnectionError
    | IConnectionClosed
    | IGetOrders;
