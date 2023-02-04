import React, {useEffect} from 'react';
import {FeedOrdersConstructor} from "../../../components/FeedOrdersConstructor/FeedOrdersConstructor";

import styles from './orders.module.css'
import {connect as connectHistory, disconnect as disconnectHistory} from "../../../services/actions/wsUserHistoryActions";
import {urlOrdersUser} from "../../../сonstants/ForQueries";
import {useAppDispatch, useAppSelector} from "../../../types/typesDataProduct";
import {getCookie} from "../../../utils/cookie";
import {Link, useLocation} from "react-router-dom";

type TOrder = {
    createdAt: string,
    ingredients: Array<string>,
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string,
}

export const OrdersUser = () => {
    const dispatch  = useAppDispatch();
    const accessToken = getCookie('token')?.split('Bearer ')[1];
    const {data} = useAppSelector(store => store.UserHistory);
    const orders = data?.orders;
    const urlOrder = `${urlOrdersUser}?token=${accessToken}`;
    const location = useLocation();

    useEffect(() => {
                dispatch(connectHistory(urlOrder));
        return () => {
            dispatch(disconnectHistory());
        };
    }, []);
    return (
        <div className={`${styles.container} mt-10`}>
            {orders && orders.map((order: TOrder) => (
                <Link
                    key={order.number}
                    to={{
                        pathname: `/profile/orders/${order.number}`,
                        state: { backgroundOrder: location }
                    }}
                    className={styles.link}
                >
                <FeedOrdersConstructor order={order}/>
                </Link>
            ))}
        </div>
    )
}