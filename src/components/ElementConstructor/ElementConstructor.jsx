import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import StyleElement from "./ElementConstructor.module.css"


export const ElementConstructor = ({ type, price, name, thumbnail}) => {
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