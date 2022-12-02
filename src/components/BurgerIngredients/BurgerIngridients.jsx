import React from "react";
import StyleIngredients from "./BurgerIngridients.module.css"
import PropTypes from "prop-types";
import {ProductElem} from "../ProductElem/ProductElem";
import {BurgerIngredientsHeader} from "../BurgerIngredientsHeader/BurgerIngredientsHeader";

export const BurgerIngredients = ({ products }) => {

    const arrBun = [];
    const arrSauce = [];
    const arrMain = []

    products.map((product) => {
        if (product.type === "bun") {
            arrBun.push(product);
        }
        if (product.type === "sauce") {
            arrSauce.push(product);
        }
        if (product.type === "main") {
            arrMain.push(product);
        }
        return product;
    })

    return (
        <section className="BurgerIngredients">
            <BurgerIngredientsHeader/>
            <div className={`${StyleIngredients.ingredients}`}>
                    <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Булки</div>
                    <div className={`${StyleIngredients.categories} mt-6`}>
                        {arrBun.map((product)=>(
                            <ProductElem product={product}/>
                        ))}
                    </div>

                    <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Соусы</div>
                    <div className={`${StyleIngredients.categories} mt-6`}>
                        {arrSauce.map((product)=>(
                            <ProductElem product={product}/>
                        ))}
                    </div>

                    <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Начинки</div>
                    <div className={`${StyleIngredients.categories} mt-6`}>
                        {arrMain.map((product)=>(
                            <ProductElem product={product}/>
                        ))}
                    </div>
            </div>
        </section>
    );
}
BurgerIngredients.propTypes = {
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