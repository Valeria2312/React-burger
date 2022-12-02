import React from "react";
import StylesConstructor from "./BurgerConstructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ElementConstructor} from "../ElementConstructor/ElementConstructor";
import {useState} from "react";
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../orderDetails/orderDetails";

export const BurgerConstructor = ({ ingredients }) => {

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
        <section className={`StylesConstructor mt-25`}>
            <div className={StylesConstructor.basket}>
                <ElementConstructor ingredients={ingredients}/>
            </div>
            <div className={`${StylesConstructor.result} mt-10`}>
                <div className={`${StylesConstructor.totalAmount} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {showModal && (
                <Modal close={closeModal}>
                    <OrderDetails />
                </Modal>)
            }
        </section>
    )

};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins:PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        }))
};