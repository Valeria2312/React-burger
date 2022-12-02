import React from "react";
import StyleOrderDetails from "./orderDetails.module.css"
import done from'../../images/done.png'

export const OrderDetails = () => {
    return (
        <div className={`${StyleOrderDetails.description} mt-30 mb-30`}>
            <p className="text text_type_digits-large">034536</p>
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <img src={done} alt='done'/>
            <p className="text text_type_main-default mb-2 mt-15 ">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}