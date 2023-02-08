import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import styles from "./OrderInfo.module.css"
import {useParams} from "react-router-dom";
import {IIngredient, TOrder, useAppSelector} from "../../types/typesDataProduct";
import {getFeedOrder} from "../../сonstants/ForQueries";

export const OrderInfo = () => {
    const { id } = useParams<{id: string}>();
    const {ingredients} = useAppSelector(store => store.BurgerIngredients);
    const [ orderDetails, setOrderDetails ] = useState<TOrder | null>(null);
    let ingredientsPrice: number = 0;
    let ingredientsArray: IIngredient[] = [];


    useEffect(() => {
        getFeedOrder(id).then(res => {
            if (res) {
                setOrderDetails(res.orders[0]);
            } else {
            }
        }).catch( err => {
        });

    }, [id]);

    ingredients.forEach((item:IIngredient ) => {
        orderDetails?.ingredients.forEach(ingredient => {
            if (ingredient === item._id) {
                ingredientsPrice += item.price;
                ingredientsArray.push(item);
            }
        })
    });

    let orderIngriedientsWithQuantity = new Map(
        ingredientsArray.map((ingriedient) => [
            ingriedient._id,
            { ...ingriedient, count: 0 },
        ])
    );
    for (const { _id } of ingredientsArray)
        // @ts-ignore
        orderIngriedientsWithQuantity.get(_id).count++;
    ingredientsArray = Array.from(orderIngriedientsWithQuantity.values());


    return (
            <div className={`${styles.container} pt-6 pl-6 pr-6 pb-6`}>
                <div className={`${styles.orderDetails}`}>
                    <p className={`${styles.orderId} text text_type_digits-default mb-10`}>#{orderDetails?.number}</p>
                </div>
                <p className={`${styles.nameBurger} text text text_type_main-medium`}>{orderDetails?.name}</p>
                <p className={`${styles.burgerStatus} text text_type_main-default mt-3`}>{orderDetails?.status}</p>
                <div className={`${styles.burgerInfo} mt-6`}>
                    <p className={`${styles.burgerIngredientsHeader} text text_type_main-large mt-15 pb-6`}>Состав:</p>
                    <div className={styles.burgerIngredients}>
                        {ingredientsArray?.map(ingredient => {
                            return (
                                <div className={styles.burgerIngredient} key={ingredient._id}>
                                    <div className={styles.burgerIngredient_image}>
                                            <img className={styles.burgerIngredient_img} src={ingredient.image_mobile} alt={`Ингредиент бургера`}/>
                                    </div>
                                    <p className="text text_type_main-default">
                                        {ingredient.name}
                                    </p>
                                    <div className={`${styles.burgerIngredient_price_container}`}>
                                        <p className="text text_type_digits-default">{`${ingredient.count} × ${ingredient.price}`}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={`${styles.price} mt-10`}>
                    <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>{orderDetails?.createdAt && <FormattedDate date={new Date(orderDetails?.createdAt)} />}</p>
                    <div className={`${styles.priceBurger}`}>
                        <p className={`text text text_type_main-medium`}>{ingredientsPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
    )
}