import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Redirect, Route } from 'react-router-dom'
import {getUser} from "../../services/actions/Registration";
import PropTypes from "prop-types";

export  const ProtectedRoute = ({ onlyAuth = false, children, ...rest }) => {
    const user = useSelector((store) => store.RegisterUser);
    const location = useLocation();
    const dispatch = useDispatch();

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

    return <Route {...rest}>{children}</Route>
}

ProtectedRoute.propTypes = {
    props: PropTypes.node,
    onlyAuth: PropTypes.bool,
    children: PropTypes.node.isRequired,
}