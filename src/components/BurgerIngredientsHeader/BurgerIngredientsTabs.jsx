import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import BurgerIngredientsTabs from "./BurgerIngredientsTabs.module.css"

export const Tabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={`${BurgerIngredientsTabs.tabs}`}>
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
