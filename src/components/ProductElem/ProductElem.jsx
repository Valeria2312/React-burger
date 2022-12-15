import React, {useState} from "react";
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import StyleIBurgerProducts from "./ProductElem.module.css"
import {Modal} from "../Modal/Modal";
import {ProductDetails} from "../ProductDetails/ProductDetails";
import {useDrag} from "react-dnd";
import {CLOSE_CURRENT_PRODUCT, SHOW_CURRENT_PRODUCT} from "../../services/actions/BurgerIngridients";
import {useDispatch, useSelector} from "react-redux";

export const ProductElem = ({product}) => {
    const {currentProduct} = useSelector((store) => store.BurgerIngredients);


    const dispatch = useDispatch();
    const openModal = () => {
        dispatch({
            type: SHOW_CURRENT_PRODUCT,
            currentProduct: product,
        })
    };

    const closeModal = () => {
        dispatch({
            type: CLOSE_CURRENT_PRODUCT,
            currentProduct: false,
        })
    };

    return (
        <div className={`${StyleIBurgerProducts.product}`} onClick={openModal}>
            <img className={`mr-4 ml-4`} src={product.image} alt="product"/>
            <Counter count={0} size="default" extraClass="m-1"/>
            <h3 className={`${StyleIBurgerProducts.productName} text text_type_main-default`}>{product.name}</h3>
            <div className={`${StyleIBurgerProducts.productPrice} mt-1 mb-1`}>
                <p className={`mr-1 text text_type_digits-default`}>{product.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            {currentProduct && (
                <Modal close={closeModal}>
                    <ProductDetails product={product}/>
                </Modal>)
            }

        </div>
    );
};

ProductElem.propTypes = {
    product: PropTypes.object.isRequired,
}
