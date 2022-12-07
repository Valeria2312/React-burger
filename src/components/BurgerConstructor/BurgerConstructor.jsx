import React  from "react";
import StylesConstructor from "./BurgerConstructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ElementConstructor} from "../ElementConstructor/ElementConstructor";
import {useState} from "react";
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../orderDetails/orderDetails";
import {useContext} from "react";
import {DataContext} from "../services/DataContext";
import {OrderContext} from "../services/OrderContext";
import {createRequest} from "../../utils/orders-api";

export const BurgerConstructor = () => {
    const { data } = useContext(DataContext);
    const {showOrder} = useContext(OrderContext)

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const arrBun = [];
    const arrMain = [];

        data.map((ingredient) => {
        if (ingredient.name === "Краторная булка N-200i") {
            arrBun.push(ingredient);
        }
        if (ingredient.type === "sauce" || ingredient.type === "main") {
            arrMain.push(ingredient);
            arrMain.splice(3, 2);
        }
        return ingredient;
    })

    const fullArrayBurgerIngredients = arrBun.concat(arrMain);

    const getOrder = () => {
        createRequest(showOrder,fullArrayBurgerIngredients);
        openModal();
    }

    const totalAmount = arrMain.reduce((sum, el) => sum + el.price, 0) + (arrBun.reduce((sum, el) => sum + el.price, 0) * 2);

    return (
        <section className={`StylesConstructor mt-25`}>
            <div className={StylesConstructor.basket}>
                {
                arrBun.map((ingredient) => (
                    <ElementConstructor key={ingredient.id} type={"top"} price={ingredient.price} name={ingredient.name + '(верх)'} thumbnail={ingredient.image}/>
                ))
            }
            {
                arrMain.map((ingredient) => (
                    <ElementConstructor key={ingredient.id} type={ingredient.type} price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image}/>
                ))
            }
                {
                arrBun.map((ingredient) => (
                <ElementConstructor key={ingredient.id} type={"bottom"} price={ingredient.price} name={ingredient.name+ '(низ)'} thumbnail={ingredient.image}/>
                ))}
            </div>
            <div className={`${StylesConstructor.result} mt-10`}>
                <div className={`${StylesConstructor.totalAmount} mr-10`}>
                    <p className="text text_type_digits-medium">{totalAmount}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={getOrder}>
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