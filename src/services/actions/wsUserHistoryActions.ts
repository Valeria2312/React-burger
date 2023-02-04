import {TWSData} from "../../types/typesDataProduct";
import {createAction} from "@reduxjs/toolkit";


export const connect = createAction<string, 'HISTORY_USER_CONNECTION_SUCCESS'>('HISTORY_USER_CONNECTION_SUCCESS');
export const disconnect = createAction('HISTORY_USER_DISCONNECT');
export const wsConnecting = createAction('WS_HISTORY_USER_CONNECTING');
export const wsOpen = createAction('WS_HISTORY_USER_OPEN');
export const wsClose = createAction('WS_HISTORY_USER_CLOSE');
export const wsMessage = createAction<TWSData, 'WS_GET_HISTORY_USER_ORDERS'>('WS_GET_HISTORY_USER_ORDERS');
export const wsError = createAction<string, 'WS_HISTORY_USER_CONNECTION_ERROR'>('WS_HISTORY_USER_CONNECTION_ERROR');

export type TWsOrdersUserActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;
