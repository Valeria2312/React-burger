import React from "react";
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './FeedOrdersConstructor.module.css'
import {TOrder, useAppSelector} from "../../types/typesDataProduct";

type TElementProps = {
    order: TOrder,
    key: number,
}

export const FeedOrdersConstructor = ({order}: TElementProps) => {
    const {ingredients} = useAppSelector(store => store.BurgerIngredients);
    const picturesArray: Array<string> = [];
    let ingredientsPrice: number = 0;

    ingredients.forEach((item: { _id: string; image_mobile: string; price: number; }) => {
        order.ingredients.forEach(ingredient => {
            if (ingredient === item._id) {
                picturesArray.push(item.image_mobile);
                ingredientsPrice += item.price;
            }
        })
    });

    return (
        <div className={`${styles.container} pt-6 pl-6 pr-6 pb-6`}>
            <div className={`${styles.orderDetails}`}>
                <p className={`${styles.orderId} text text_type_digits-default`}>{`# ${order.number}`}</p>
                <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>
                    <FormattedDate date={new Date(order.createdAt)} />
                </p>
            </div>
            <p className={`${styles.nameBurger} text text text_type_main-medium mt-6`}>{order.name}</p>
            <div className={`${styles.burgerInfo} ml-6 mt-6`}>
                <div className={`${styles.burgerIngredients}`}>
                    {picturesArray[0] &&
                        <div className={styles.ingredient__frame__1}>
                            <img className={styles.ingredient__img} src={picturesArray[0]} alt={`Ингредиент бургера`}/>
                        </div>
                    }
                    {picturesArray[1] &&
                        <div className={styles.ingredient__frame__2}>
                            <img className={styles.ingredient__img} src={picturesArray[1]} alt={`Ингредиент бургера`}/>
                        </div>
                    }
                    {picturesArray[2] &&
                        <div className={styles.ingredient__frame__3}>
                            <img className={styles.ingredient__img} src={picturesArray[2]} alt={`Ингредиент бургера`}/>
                        </div>
                    }
                    {picturesArray[3] &&
                        <div className={styles.ingredient__frame__4}>
                            <img className={styles.ingredient__img} src={picturesArray[3]} alt={`Ингредиент бургера`}/>
                        </div>
                    }
                    {picturesArray[4] &&
                        <div className={styles.ingredient__frame__5}>
                            <img className={styles.ingredient__img} src={picturesArray[4]} alt={`Ингредиент бургера`}/>
                        </div>
                    }
                    {picturesArray[5] &&
                        <>
                            <div className={styles.ingredient__frame__6}>
                                <img className={styles.ingredient__img} src={picturesArray[5]} alt={`Ингредиент бургера`}/>
                            </div>
                        </>
                    }
                </div>
                <div className={styles.priceBurger}>
                    <p className={`text text text_type_main-medium`}>{ingredientsPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}