import React, {useState} from "react";
import StylesConstructor from "./BurgerConstructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ElementConstructor} from "../ElementConstructor/ElementConstructor";
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../orderDetails/orderDetails";
import {typesDataProduct} from "../../types/typesDataProduct";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    GET_ORDER_REQUEST,
    GET_OPEN_MODAL,
    getOrderNumber,
    GET_CLOSE_MODAL,
} from "../../services/actions/BurgerConstructor";


export const BurgerConstructor = () => {
    const data = useSelector((store) => store.BurgerIngredients.ingredients);
    const {showModal} = useSelector(store => store.OrderDetails);

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(getOrderNumber(orderArr));
        dispatch({
            type: GET_OPEN_MODAL,
        });
    };

    const closeModal = () => {
        dispatch({
            type: GET_CLOSE_MODAL,
        });
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


    console.log("проверка массивов")
    console.log(data);
    console.log(arrBun);
    console.log(arrMain);


    const fullBurgerIngredients = arrBun.concat(arrMain);
    const orderArr = fullBurgerIngredients.map(elem => elem._id);
    console.log(orderArr);

    // useEffect(() => {
    //     dispatch(getOrderNumber(orderArr));
    //     console.log(orderArr);
    // }, []);

    const totalAmount = arrMain.reduce((sum, el) => sum + el.price, 0) + (arrBun.reduce((sum, el) => sum + el.price, 0) * 2);

    return (
        <section className={`StylesConstructor mt-25`}>
            <div className={StylesConstructor.basket}>
                {
                    arrBun.map((ingredient) => (
                        <ElementConstructor key={ingredient.id} isLocked={true} type={"top"} price={ingredient.price}
                                            name={ingredient.name + '(верх)'} thumbnail={ingredient.image}/>
                    ))
                }
                {
                    arrMain.map((ingredient) => (
                        <ElementConstructor key={ingredient.id} isLocked={false} type={ingredient.type}
                                            price={ingredient.price} name={ingredient.name}
                                            thumbnail={ingredient.image}/>
                    ))
                }
                {
                    arrBun.map((ingredient) => (
                        <ElementConstructor key={ingredient.id} isLocked={true} type={"bottom"} price={ingredient.price}
                                            name={ingredient.name + '(низ)'} thumbnail={ingredient.image}/>
                    ))}
            </div>
            <div className={`${StylesConstructor.result} mt-10`}>
                <div className={`${StylesConstructor.totalAmount} mr-10`}>
                    <p className="text text_type_digits-medium">{totalAmount}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>

                    Оформить заказ
                </Button>
            </div>
            {showModal &&
                <Modal close={closeModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    )
};

BurgerConstructor.propTypes = {
    ingredients: typesDataProduct.isRequired,
};