import React from "react";
import {FeedOrdersConstructor} from "../FeedOrdersConstructor/FeedOrdersConstructor";
import styles from './FeedOrders.module.css'


export const FeedOrders = () => {
    return (
        <div className={styles.container}>
            <FeedOrdersConstructor/>
            <FeedOrdersConstructor/>
            <FeedOrdersConstructor/>
            <FeedOrdersConstructor/>
            <FeedOrdersConstructor/>
        </div>

    )
}