import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import {App} from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {rootReducer, SocketMiddleware, UserSocketMiddleware} from "./services/reducers";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";



export const store = configureStore({
    reducer: rootReducer,
    //@ts-ignore
    middleware: (getDefaultMiddleware)  => getDefaultMiddleware().concat(SocketMiddleware,UserSocketMiddleware)
})
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
