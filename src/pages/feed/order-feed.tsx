import React, {useEffect} from "react";
import styles from './order-feed.module.css'
import {FeedOrdersDetails} from "../../components/FeedOrdersDetails/FeedOrdersDetails";
import {FeedOrders} from "../../components/FeedOrders/FeedOrders";
import {connect as connectHistory, disconnect as disconnectHistory} from "../../services/actions/wsHistoryActions";
import {urlOrdersAll} from "../../сonstants/ForQueries";
import {useAppDispatch} from "../../types/typesDataProduct";

export const OrderFeed = () => {
    const dispatch  = useAppDispatch();
    useEffect(() => {
        dispatch(connectHistory(urlOrdersAll));
        return () => {
            dispatch(disconnectHistory());
        };
    }, []);

    return (
        <div>
            <h2 className={`${styles.containerHeader} text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
            <div className={styles.container}>
                <FeedOrders/>
                <FeedOrdersDetails/>
            </div>
        </div>
    )
}