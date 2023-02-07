import {Middleware} from "@reduxjs/toolkit";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {RootState} from "../types/typesDataProduct";
import {updateToken} from "./actions/Registration";

export type wsActionsTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}
export const socketMiddlewareCreator = (wsActions: wsActionsTypes):Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null =  null;

        return next => action => {
            const { dispatch } = store;
            const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;

            if(wsConnect.match(action)) {

                socket = new WebSocket(action.payload)
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen);
                };

                socket.onerror = err => {
                    // dispatch(onError('error'));
                    updateToken()
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessage(parsedData));
                };

                socket.onclose = event => {
                    dispatch(onClose());
                };
                if(wsDisconnect.match(action)) {
                    socket?.close();
                }
            }

            next(action);
        };
    };
};