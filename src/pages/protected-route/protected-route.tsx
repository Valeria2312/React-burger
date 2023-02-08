import React, { useEffect } from 'react'
import { useLocation, Redirect, Route } from 'react-router-dom'
import {getUser} from "../../services/actions/Registration";
import {useAppDispatch, useAppSelector} from "../../types/typesDataProduct";

type TProtectedRoute = {
    children: React.ReactNode,
    onlyAuth?: boolean,
    path?: string,
    exact?: boolean
}

export  const ProtectedRoute = ({ onlyAuth, children, ...rest }: TProtectedRoute) => {
    const user = useAppSelector((store) => store.RegisterUser);
    const location = useLocation();
    const dispatch = useAppDispatch();


    // @ts-ignore
    const from = location.state?.from || '/';

    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (onlyAuth && !user) {
        return (
            <Redirect to={from} />
        );
    } else if (!user && !onlyAuth) {
        return (
            <Redirect to={{ pathname: '/login', state: { from: location }}}/>
        )
    } else {
        return (
         <Route {...rest}>{children}</Route>
        )
    }
}

