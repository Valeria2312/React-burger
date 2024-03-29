import React, {useCallback, useMemo} from "react";
import StylesConstructor from "./BurgerConstructor.module.css";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../orderDetails/orderDetails";
import {
    ADD_BUN,
    ADD_INGREDIENT,
    DEL_INGREDIENTS,
    GET_CLOSE_MODAL,
    GET_OPEN_MODAL,
    getOrderNumber, MOVE_INGREDIENT,
} from "../../services/actions/BurgerConstructor";
import {useDrop} from "react-dnd";
import {v4 as uuid4} from 'uuid';
import BurgerItem from "../BurgerItem/BurgerItem";
import {useHistory} from "react-router-dom";
import {IIngredient, useAppDispatch, useAppSelector} from "../../types/typesDataProduct";

export const BurgerConstructor = () => {
    const {showModal} = useAppSelector(store => store.OrderDetails);
    const {ingredients} = useAppSelector((store) => store.BurgerConstructor);
    const {bun} = useAppSelector(store => store.BurgerConstructor);
    const {user} = useAppSelector(store => store.RegisterUser);
    const dispatch = useAppDispatch();
    const history = useHistory();

    type TCallback = (
        dragIndex: number,
        hoverIndex: number
    ) => any

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item: IIngredient) {
            item = {...item};
            item.uuid = uuid4();
            if (item.type === 'bun') {
                dispatch({
                    type: ADD_BUN,
                    data: item,
                })
            } else {
                dispatch({
                    type: ADD_INGREDIENT,
                    data: item,
                    key: item.uuid,
                })
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    const openModal = () => {
        if(!user) {
            return (history.push({ pathname: "/login"}))
        } else {
            dispatch(getOrderNumber(orderArr));
            dispatch({
                type: GET_OPEN_MODAL,
            });
            dispatch({
                type: DEL_INGREDIENTS,
            })
        }

    };

    const closeModal = () => {
        dispatch({
            type: GET_CLOSE_MODAL,
        });
    };


    const orderArr: string[] | undefined = useMemo(() => {
        if (ingredients && bun) {
            return [...ingredients, bun].map(elem => elem._id)
        }
    }, [ingredients, bun])

    //подстчет цены
    const price: number | false | undefined = useMemo(() => {
        if (ingredients && bun) {
            return ingredients?.length > 0 && bun.price * 2 + ingredients?.reduce((acc, item ) => acc + item.price, 0)
        }
    }, [ingredients, bun]);


    const moveIngredient = useCallback<TCallback>(
        (dragIndex, hoverIndex) => {
          const dragItem = ingredients[dragIndex];
          const hoverItem = ingredients[hoverIndex];
          const newIngredients = [...ingredients];
          newIngredients[dragIndex] = hoverItem;
          newIngredients[hoverIndex] = dragItem;
          dispatch({ type: MOVE_INGREDIENT, sorted: newIngredients });
        },
        [dispatch, ingredients]
      );

    const renderIngredients = (ing: IIngredient, index: number) => {
        return (
            <BurgerItem ing={ing} index={index} key={ing.uuid} moveIng={moveIngredient}/>
        )
    }

    return (
        <section className={`StylesConstructor mt-25`}>
            <div ref={dropRef} className={StylesConstructor.basket} data-test-id="burger-container">
                {bun ?
                    <div>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + '(верх)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                    :
                    <div>
                        <h2>Добавьте булку</h2>
                    </div>
                }
                {ingredients.length >= 1 ?
                    ingredients.map((ingredient, index) => (renderIngredients(ingredient, index)))
                    :
                    <div>
                        <h2>Добавьте начинку</h2>
                    </div>
                }
                {bun ?
                    <div>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + '(низ)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                    :
                    <div>
                        <h2>Добавьте булку</h2>
                    </div>
                }
            </div>
            <div className={`${StylesConstructor.result} mt-10`}>
                <div className={`${StylesConstructor.totalAmount} mr-10`}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal} data-test-id="button-order">

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
