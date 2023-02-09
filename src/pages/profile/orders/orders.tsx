import React, {useEffect} from 'react';
import {FeedOrdersConstructor} from "../../../components/FeedOrdersConstructor/FeedOrdersConstructor";

import styles from './orders.module.css'
import {
    connect as connectHistory,
    disconnect as disconnectHistory
} from "../../../services/actions/wsUserHistoryActions";
import {urlOrdersUser} from "../../../сonstants/ForQueries";
import {useAppDispatch, useAppSelector} from "../../../types/typesDataProduct";
import {getCookie} from "../../../utils/cookie";
import {Link, useLocation} from "react-router-dom";
import {ProfileNav} from "../../../components/ProfileNav/ProfileNav";
import StyleProfile from "../profile.module.css";
import {updateToken} from "../../../services/actions/Registration";

export const OrdersUser = () => {
    const dispatch = useAppDispatch();
    const accessToken = getCookie('token')?.split('Bearer ')[1];
    const {data} = useAppSelector(store => store.UserHistory);
    const orders = data?.orders;
    const location = useLocation();
    const urlOrder = `${urlOrdersUser}?token=${accessToken}`;

    if(accessToken === undefined) {
        dispatch(updateToken())
    }

    useEffect(() => {
        dispatch(connectHistory(urlOrder));
        return () => {
            dispatch(disconnectHistory());
        };
    }, [dispatch, urlOrder]);

    return (
        <div className={`${StyleProfile.main}`}>
            <ProfileNav/>
            <div className={`${styles.container} mt-10`}>
                {orders?.map((order) => (
                    <Link
                        key={order.number}
                        to={{
                            pathname: `/profile/orders/${order.number}`,
                            state: {background: location}
                        }}
                        className={styles.link}
                    >
                        <FeedOrdersConstructor order={order} key={order.number}/>
                    </Link>
                ))}
            </div>
            </div>
    )
}