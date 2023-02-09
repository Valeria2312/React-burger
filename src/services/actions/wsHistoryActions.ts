import {TWSData} from "../../types/typesDataProduct";
import {createAction} from "@reduxjs/toolkit";

export const connect = createAction<string, 'HISTORY_CONNECTION_SUCCESS'>('HISTORY_CONNECTION_SUCCESS');
export const disconnect = createAction('HISTORY_DISCONNECT');
export const wsConnecting = createAction('WS_HISTORY__CONNECTING');
export const wsOpen = createAction('WS_HISTORY__OPEN');
export const wsClose = createAction('WS_HISTORY__CLOSE');
export const wsMessage = createAction<TWSData, 'WS_GET_HISTORY_ORDERS'>('WS_GET_HISTORY_ORDERS');
export const wsError = createAction<string, 'WS_HISTORY_CONNECTION_ERROR'>('WS_HISTORY_CONNECTION_ERROR');

export type TWsOrdersActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;