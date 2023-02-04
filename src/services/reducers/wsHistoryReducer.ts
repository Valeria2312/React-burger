import {TWSData} from "../../types/typesDataProduct";
import {createReducer} from "@reduxjs/toolkit";
import {wsClose, wsError, wsMessage, wsOpen} from "../actions/wsHistoryActions";

type TWSOrdersType = {
    status: string;
    error: string;
    data: TWSData | null;
};

const initialState: TWSOrdersType = {
    status: 'offline',
    error: '',
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
};

export const historyReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsOpen,(state) => {
            state.status = "online"
        })
        .addCase(wsClose,(state) => {
            state.status = "close"
        })
        .addCase(wsMessage,(state, action) => {
            state.data = action.payload
        })
        .addCase(wsError,(state, action) => {
            state.error = action.payload
        })
})
