import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import styles from "./OrderInfo.module.css"
import {useHistory, useParams} from "react-router-dom";
import {IIngredient, TOrder, useAppSelector} from "../../types/typesDataProduct";
import {getFeedOrder} from "../../сonstants/ForQueries";

export const OrderInfo = () => {
    const { id } = useParams<{id: string}>();
    const history = useHistory();
    const {ingredients} = useAppSelector(store => store.BurgerIngredients);
    const [ orderDetails, setOrderDetails ] = useState<TOrder | null>(null);

    useEffect(() => {
        const keydownHandler = (e : KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    history.goBack();
                    break;
                default:
            }
        };

        document.addEventListener('keydown', keydownHandler);

        return () => document.removeEventListener('keydown', keydownHandler);
    })
    useEffect(() => {
        getFeedOrder(id).then(res => {
            if (res) {
                setOrderDetails(res.orders[0]);
            } else {
            }
        }).catch( err => {
        });

    }, []);


    let ingredientsPrice: number = 0;
    const ingredientsArray: Array<IIngredient> = [];


    ingredients.forEach((item:IIngredient ) => {
        orderDetails?.ingredients.forEach(ingredient => {
            if (ingredient === item._id) {
                ingredientsPrice += item.price;
                ingredientsArray.push(item);
            }
        })
    });

    console.log(ingredientsArray)

    const onClose = () => {
        history.goBack();
    }
    return (
        // <Modal close={onClose}>
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
                                        <p className="text text_type_digits-default">{ingredient.price}</p>
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
        // </Modal>

    )
}