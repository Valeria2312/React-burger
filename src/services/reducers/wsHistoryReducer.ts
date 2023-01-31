import {TWSData} from "../../types/typesDataProduct";
import {
    TAllHistoryActions,
    WS_GET_HISTORY_ORDERS, WS_HISTORY_CONNECTION_CLOSED,
    WS_HISTORY_CONNECTION_ERROR,
    WS_HISTORY_CONNECTION_SUCCESS
} from "../actions/wsHistoryActions";

export type TOrdersReducer = {
    wsConnected: boolean,
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
export const historyReducer = (state = initialState, action: TAllHistoryActions) => {
    switch (action.type) {
        case WS_HISTORY_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_HISTORY_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };
        case WS_HISTORY_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
            }
        case WS_GET_HISTORY_ORDERS:
            return {
                ...state,
                wsConnected: true,
                data: action.payload,
            }
        default:
            return state;
    }
};