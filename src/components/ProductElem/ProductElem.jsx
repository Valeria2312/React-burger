import React, {useState} from "react";
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import StyleIBurgerProducts from "./ProductElem.module.css"
import {Modal} from "../Modal/Modal";
import {ProductDetails} from "../ProductDetails/ProductDetails";

export const ProductElem = ({ product }) => {


    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        console.log("open")
    };

    const closeModal = () => {
        setShowModal(false);
        console.log("close")
    };


        return (
            <div className={`${StyleIBurgerProducts.product}`} onClick={openModal} key={product.id}>
                <img className={`mr-4 ml-4`} src={product.image} alt="product"/>
                <Counter count={0} size="default" extraClass="m-1"/>
                <h3 className={`${StyleIBurgerProducts.productName} text text_type_main-default`}>{product.name}</h3>
                <div className={`${StyleIBurgerProducts.productPrice} mt-1 mb-1`}>
                    <p className={`mr-1 text text_type_digits-default`}>{product.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                {showModal && (
                    <Modal close={closeModal}>
                        <ProductDetails product={product}/>
                    </Modal>)
                }

            </div>
        );
    };

ProductElem.propTypes = {
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }
