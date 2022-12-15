import React from "react";
import StyleProductDetails from "./ProductDetails.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const ProductDetails = () => {
    const product = useSelector((store) => store.BurgerIngredients.currentProduct);

    return (
        <>
            <p className={`text text_type_main-large ml-10 mt-10`}>Детали ингридиента</p>
            <div className={`${StyleProductDetails.description}`}>
                <img className={`mr-4 ml-4`} src={product.image_large} alt="product"/>
                <h3 className={`text text_type_main-medium`}>{product.name}</h3>

                <table className={`${StyleProductDetails.energyValue} mt-8 mb-15`}>
                    <tbody>
                    <tr>
                        <th className="text text_type_main-default text_color_inactive">Калории,ккал</th>
                        <th className="text text_type_main-default text_color_inactive">Белки, г</th>
                        <th className="text text_type_main-default text_color_inactive">Жиры, г</th>
                        <th className="text text_type_main-default text_color_inactive">Углеводы, г</th>
                    </tr>
                    <tr>
                        <th className="text text_type_main-default text_color_inactive">{product.calories}</th>
                        <th className="text text_type_main-default text_color_inactive">{product.proteins}</th>
                        <th className="text text_type_main-default text_color_inactive">{product.fat}</th>
                        <th className="text text_type_main-default text_color_inactive">{product.carbohydrates}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

ProductDetails.propTypes = {
    product: PropTypes.object.isRequired,
}