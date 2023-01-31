import {TWSData} from "../../types/typesDataProduct";
import {
    TUserHistoryActions, WS_GET_USER_HISTORY_ORDERS, WS_USER_HISTORY_CONNECTION_CLOSED,
    WS_USER_HISTORY_CONNECTION_ERROR,
    WS_USER_HISTORY_CONNECTION_SUCCESS
} from "../actions/wsUserHistoryActions";

export type TOrdersReducer = {
    wsConnected?: boolean,
    data: TWSData
}
const initialState: TOrdersReducer = {
    wsConnected: false,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
};

export const userHistoryReducer = (state = initialState, action: TUserHistoryActions) => {
    switch (action.type) {
        case WS_USER_HISTORY_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_USER_HISTORY_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
            };

        case WS_USER_HISTORY_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_USER_HISTORY_ORDERS:
            return {
                ...state,
                data: action.payload,
            };

        default:
            return state;
    }
};