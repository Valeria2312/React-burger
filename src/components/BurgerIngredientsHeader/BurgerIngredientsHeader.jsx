import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import StylesBurgerIngredientsHeader from "./BurgerIngredientsHeader.module.css"


export  const BurgerIngredientsHeader = () => {
    const Tabs = () => {
        const [current, setCurrent] = React.useState('one')
        return (
            <div className={`${StylesBurgerIngredientsHeader.tabs}`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
        )
    }
    Tabs.propTypes = {
        active: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    }

    return (
        <>
            <p className={`${StylesBurgerIngredientsHeader.headerConstructor} mt-10 mb-5 text text_type_main-large`}>Соберите бургер</p>
            <Tabs />
        </>
    )
}