import {
    WS_GET_USER_HISTORY_ORDERS,
    WS_USER_HISTORY_CONNECTION_CLOSED,
    WS_USER_HISTORY_CONNECTION_ERROR,
    WS_USER_HISTORY_CONNECTION_SUCCESS
} from "./actions/wsUserHistoryActions";
import {
    WS_GET_HISTORY_ORDERS,
    WS_HISTORY_CONNECTION_CLOSED,
    WS_HISTORY_CONNECTION_ERROR,
    WS_HISTORY_CONNECTION_SUCCESS
} from "./actions/wsHistoryActions";
import {Middleware} from "redux";
import {getCookie} from "../utils/cookie";

type WSActions = {
    onOpen:
        | typeof WS_USER_HISTORY_CONNECTION_SUCCESS
        | typeof WS_HISTORY_CONNECTION_SUCCESS;
    onClose:
        | typeof WS_USER_HISTORY_CONNECTION_CLOSED
        | typeof WS_HISTORY_CONNECTION_ERROR;
    onError:
        | typeof WS_USER_HISTORY_CONNECTION_ERROR
        | typeof WS_HISTORY_CONNECTION_CLOSED;
    onMessage:
        | typeof WS_GET_USER_HISTORY_ORDERS
        | typeof WS_GET_HISTORY_ORDERS;
};

export const socketMiddleware = (  url: string,
                                   actions: WSActions,
                                   withToken: boolean): Middleware => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { onOpen, onClose, onError, onMessage } = actions;
            const { user } = getState().user;
            if (type === onOpen && user) {
                socket = withToken
                    ? (socket = new WebSocket(
                        `${url}?token=${getCookie("accessToken")?.split("Bearer ")[1]}`
                    ))
                    : new WebSocket(url);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    dispatch({ type: onMessage, payload: JSON.parse(event.data) });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

            }
            if (type === onClose) {
                socket?.close();
            }

            next(action);
        };
    };
};