import React, { useEffect } from 'react'
import { useLocation, Redirect, Route } from 'react-router-dom'
import {getUser} from "../../services/actions/Registration";
import PropTypes from "prop-types";
import {useAppDispatch, useAppSelector} from "../../types/typesDataProduct";

type TProtectedRoute = {
    children: React.ReactNode,
    onlyAuth?: boolean,
    path?: string,
    exact?: boolean
}

export  const ProtectedRoute = ({ onlyAuth = false, children, ...rest }: TProtectedRoute) => {
    const user = useAppSelector((store) => store.RegisterUser);
    const location = useLocation();
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (!user && !onlyAuth) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: location },
                }}
            />
        )
    }
    if (onlyAuth && user) {

        return (
            // @ts-ignore
            <Redirect to={location?.state?.from || '/'} />
        );
    }

    return <Route {...rest}>{children}</Route>
}