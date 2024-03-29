import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import StyleIBurgerProducts from "./ProductElem.module.css"
import {useDrag} from "react-dnd";
import {SHOW_CURRENT_PRODUCT} from "../../services/actions/BurgerIngridients";
import {useLocation, Link} from "react-router-dom";
import {IIngredient, useAppDispatch, useAppSelector} from "../../types/typesDataProduct";

type TElementProps = {
    product: IIngredient;
};

export const ProductElem = ({product}: TElementProps) => {
    const {bun, ingredients} = useAppSelector((store) => store.BurgerConstructor);
    const location = useLocation();

    const foundInBasket = [...ingredients, bun].filter((prod) => {
        if (prod && prod._id) {
            return product._id === prod._id;
        }
        return false;
    });
    const count = foundInBasket.length;

    const dispatch = useAppDispatch();

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: product,
    });

    const openModal = () => {
        dispatch({
            type: SHOW_CURRENT_PRODUCT,
            currentProduct: product,
        })
    };

    return (
        <>
            <Link
                key={product._id}
                to={{
                    pathname: `/ingredients/${product._id }`,
                    state: {background: location}
                }}
                className={StyleIBurgerProducts.link}
            >
            <div ref={dragRef} className={`${StyleIBurgerProducts.product}`} onClick={openModal} key={product._id} data-test-id="ingredient-link">
                <img className={`mr-4 ml-4`} src={product.image} alt={product.name}/>
                <Counter count={count} size="default" extraClass="m-1"/>
                <h3 className={`${StyleIBurgerProducts.productName} text text_type_main-default`}>{product.name}</h3>
                <div className={`${StyleIBurgerProducts.productPrice} mt-1 mb-1`}>
                    <p className={`mr-1 text text_type_digits-default`}>{product.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            </Link>
        </>
    );
};