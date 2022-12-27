import React from "react";
import StyleProductDetails from "./IngredientDetails.module.css";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

export const IngredientDetails = () => {
    const currentProduct = useSelector((store) => store.BurgerIngredients.currentProduct);

    const { id } = useParams()
    return (
        <>
            <p className={`text text_type_main-large ml-10 mt-10`}>Детали ингридиента</p>
            <div className={`${StyleProductDetails.description}`}>
                <img className={`mr-4 ml-4`} src={currentProduct.image_large} alt={currentProduct.name}/>
                <h3 className={`text text_type_main-medium`}>{currentProduct.name}</h3>

                <table className={`${StyleProductDetails.energyValue} mt-8 mb-15`}>
                    <tbody>
                    <tr>
                        <th className="text text_type_main-default text_color_inactive">Калории,ккал</th>
                        <th className="text text_type_main-default text_color_inactive">Белки, г</th>
                        <th className="text text_type_main-default text_color_inactive">Жиры, г</th>
                        <th className="text text_type_main-default text_color_inactive">Углеводы, г</th>
                    </tr>
                    <tr>
                        <th className="text text_type_main-default text_color_inactive">{currentProduct.calories}</th>
                        <th className="text text_type_main-default text_color_inactive">{currentProduct.proteins}</th>
                        <th className="text text_type_main-default text_color_inactive">{currentProduct.fat}</th>
                        <th className="text text_type_main-default text_color_inactive">{currentProduct.carbohydrates}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
