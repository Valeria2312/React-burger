import React from "react";
import StylesConstructor from "./BurgerConstructor.module.css";
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";


export const BurgerConstructor = ({ ingredients }) => {

   const ElementTop = ({ price, name, image }) => {
       return (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
               <ConstructorElement
                   type="top"
                   isLocked={true}
                   text={name}
                   price={price}
                   thumbnail={image}
               />
           </div>
       )
    }
    const ElementBottom = ({ price, name, image }) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={name}
                    price={price}
                    thumbnail={image}
                />
            </div>
        )
    }
    const ElementMain = ({ price, name, image }) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ConstructorElement
                        text={name}
                        price={price}
                        thumbnail={image}
                />
            </div>
        )
    }

    ElementTop.propTypes = {
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(["top" | "bottom" | undefined]),
        isLocked: PropTypes.oneOf([PropTypes.bool | undefined]),
        extraClass: PropTypes.oneOf([PropTypes.string | undefined]),
        handleClose:PropTypes.func,
    }
    ElementBottom.propTypes = {
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(["top" | "bottom" | undefined]),
        isLocked: PropTypes.oneOf([PropTypes.bool | undefined]),
        extraClass: PropTypes.oneOf([PropTypes.string | undefined]),
        handleClose:PropTypes.func,
    }
    ElementMain.propTypes = {
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(["top" | "bottom" | undefined]),
        isLocked: PropTypes.oneOf([PropTypes.bool | undefined]),
        extraClass: PropTypes.oneOf([PropTypes.string | undefined]),
        handleClose:PropTypes.func,
}

    const arrBun = [];
    const arrMain = [];

    console.log(arrMain);
    ingredients.map((ingredient) => {
        if(ingredient.name === "Краторная булка N-200i") {
            arrBun.push(ingredient);
        } if(ingredient.type === "sauce" || ingredient.type === "main") {
            arrMain.push(ingredient);
            arrMain.splice(3, 2);
        }
        return ingredient;
    })


    // ingredients.forEach(ingredient => ingredient.index < 3 ? arrMain.push(ingredient) : null)
    return (
        <section className={`StylesConstructor mt-25`}>
            <div className={StylesConstructor.basket}>
                {arrBun.map((ingredient)=>(
                <ElementTop price={ingredient.price} name={ingredient.name} image={ingredient.image}/>
                ))}
                {arrMain.map((ingredient)=>(
                    <ElementMain price={ingredient.price} name={ingredient.name} image={ingredient.image}/>
                ))}
                {arrBun.map((ingredient)=>(
                    <ElementBottom price={ingredient.price} name={ingredient.name} image={ingredient.image}/>
                ))}
            </div>
            <div className={`${StylesConstructor.result} mt-10`}>
                <div className={`${StylesConstructor.totalAmount} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )

};
