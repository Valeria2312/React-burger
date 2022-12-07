import React, {useContext} from "react";
import StyleIngredients from "./BurgerIngridients.module.css"
import PropTypes from "prop-types";
import {ProductElem} from "../ProductElem/ProductElem";
import {BurgerIngredientsHeader} from "../BurgerIngredientsHeader/BurgerIngredientsHeader";
import {DataContext} from "../services/DataContext";
import {typesDataProduct} from "../../types/typesDataProduct";

export const BurgerIngredients = () => {
    const { data } = useContext(DataContext);

    const arrBun = [];
    const arrSauce = [];
    const arrMain = []

    data.map((product) => {
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
                        <ProductElem key={product.id} product={product}/>
                    ))}
                </div>

                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Соусы</div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrSauce.map((product)=>(
                        <ProductElem key={product.id} product={product}/>
                    ))}
                </div>

                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Начинки</div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrMain.map((product)=>(
                        <ProductElem key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(typesDataProduct)).isRequired,
};