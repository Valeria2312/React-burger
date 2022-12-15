import React, {useEffect, useMemo} from "react";
import StyleIngredients from "./BurgerIngridients.module.css"
import {ProductElem} from "../ProductElem/ProductElem";
import {useDispatch, useSelector} from "react-redux";
import {Tabs} from "../BurgerIngredientsHeader/BurgerIngredientsTabs";
import {getIngredients} from "../../services/actions/BurgerIngridients";

export const BurgerIngredients = () => {
    const {ingredients} = useSelector(store => store.BurgerIngredients);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])


    const arrBun = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const arrSauce = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const arrMain = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);

    return (
        <section className="BurgerIngredients">
            <p className={`${StyleIngredients.headerConstructor} mt-10 mb-5 text text_type_main-large`}>Соберите
                бургер</p>
            <Tabs/>
            <div className={`${StyleIngredients.ingredients}`}>
                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Булки</div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrBun.map((product) => (
                        <ProductElem key={product.id} product={product}/>
                    ))}
                </div>

                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Соусы</div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrSauce.map((product) => (
                        <ProductElem key={product.id} product={product}/>
                    ))}
                </div>

                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Начинки</div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrMain.map((product) => (
                        <ProductElem key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    // ingredients: PropTypes.arrayOf(PropTypes.shape(typesDataProduct)).isRequired,
};