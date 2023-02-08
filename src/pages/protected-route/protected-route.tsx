import React, { useEffect } from 'react'
import { useLocation, Redirect, Route } from 'react-router-dom'
import {getUser} from "../../services/actions/Registration";
import {useAppDispatch, useAppSelector} from "../../types/typesDataProduct";
import {getCookie} from "../../utils/cookie";

type TProtectedRoute = {
    children: React.ReactNode,
    onlyAuth?: boolean,
    path?: string,
    exact?: boolean
}

export  const ProtectedRoute = ({ onlyAuth, children, ...rest }: TProtectedRoute) => {
    const { user } = useAppSelector(store => store.RegisterUser);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isAuthorized = getCookie("accessToken");


    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (!onlyAuth && isAuthorized) {
        // @ts-ignore
        const { from } = location.state?.from || { from: { pathname: "/" } };
        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        );
    }

    if (onlyAuth) {
        return (
            <Route {...rest}>
                <Redirect to={{ pathname: "/login", state: { from: location } }} />
            </Route>
        );
    }

    return <Route {...rest}>{children}</Route>;
};