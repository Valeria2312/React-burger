import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Redirect, Route } from 'react-router-dom'
import {getUser} from "../../services/actions/Registration";
import PropTypes from "prop-types";

export  const ProtectedRoute = (props) => {
    const user = useSelector((store) => store.RegisterUser)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (!user) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: location },
                }}
            />
        )
    }

    return <Route {...props} />
}

ProtectedRoute.propTypes = {
    props: PropTypes.node.isRequired,
}