import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import StyleElement from "./ElementConstructor.module.css"

export const ElementConstructor = ({ingredients}) => {

    const Element = ({ type, price, name, thumbnail}) => {
        return (
            <div className={`${StyleElement.element}`}>
                <ConstructorElement
                    type={type}
                    isLocked={true}
                    text={name}
                    price={price}
                    thumbnail={thumbnail}
                />
            </div>
        )
    }

    Element.propTypes = {
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(["top" | "bottom" | undefined]),
        isLocked: PropTypes.oneOf([PropTypes.bool | undefined]),
        extraClass: PropTypes.oneOf([PropTypes.string | undefined]),
        handleClose: PropTypes.func,
    }

    const arrBun = [];
    const arrMain = [];

    ingredients.map((ingredient) => {
        if (ingredient.name === "Краторная булка N-200i") {
            arrBun.push(ingredient);
        }
        if (ingredient.type === "sauce" || ingredient.type === "main") {
            arrMain.push(ingredient);
            arrMain.splice(3, 2);
        }
        return ingredient;
    })

    return (
        <>
            {
                arrBun.map((ingredient) => (
                    <Element type={"top"} price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image}/>
                ))
            }
            {
                arrMain.map((ingredient) => (
                    <Element price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image}/>
                ))
            }
            {
                arrBun.map((ingredient) => (
                    <Element type={"bottom"} price={ingredient.price} name={ingredient.name} thumbnail={ingredient.image}/>
                ))
            }
        </>
    )

}

ElementConstructor.propTypes = {
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