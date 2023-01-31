import React from 'react';
import {FeedOrdersConstructor} from "../../../components/FeedOrdersConstructor/FeedOrdersConstructor";

import styles from './orders.module.css'

export const OrdersUser = () => {

    return (
        <div className={`${styles.container} mt-10`}>
            <FeedOrdersConstructor/>
        </div>
    )
}