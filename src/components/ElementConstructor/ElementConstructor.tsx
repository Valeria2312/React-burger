import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import StyleElement from "./ElementConstructor.module.css"

type TElement = {
    isLocked: boolean | undefined
    type: "top" | "bottom" | undefined
    price: number
    name: string
    thumbnail: string
}

export const ElementConstructor = ({ isLocked, type, price, name, thumbnail}: TElement) => {
    console.log("я используюсь ??")
    return (
        <div className={`${StyleElement.element}}`}>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={name}
                price={price}
                thumbnail={thumbnail}
            />
        </div>
    )
}
