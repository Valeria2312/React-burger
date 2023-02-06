import React, {useEffect} from "react";
import styles from './order-feed.module.css'
import {FeedOrdersDetails} from "../../components/FeedOrdersDetails/FeedOrdersDetails";
import {FeedOrders} from "../../components/FeedOrders/FeedOrders";
import {connect as connectHistory, disconnect as disconnectHistory} from "../../services/actions/wsHistoryActions";
import {urlOrdersAll} from "../../сonstants/ForQueries";
import {useAppDispatch} from "../../types/typesDataProduct";
import {useLocation} from "react-router-dom";

export const OrderFeed = () => {
    const dispatch  = useAppDispatch();
    // const location = useLocation();
    useEffect(() => {
        dispatch(connectHistory(urlOrdersAll));
        return () => {
            dispatch(disconnectHistory());
        };
    }, [dispatch,connectHistory]);

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