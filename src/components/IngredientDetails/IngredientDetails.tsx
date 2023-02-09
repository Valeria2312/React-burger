import React, {useState, useEffect} from "react";
import StyleProductDetails from "./IngredientDetails.module.css";
import {useParams} from "react-router-dom";
import {IIngredient, useAppSelector} from "../../types/typesDataProduct";

export const IngredientDetails = () => {
    const { id } = useParams<{ id?: string }>();
    const {ingredients} = useAppSelector(store => store.BurgerIngredients);
    const [data, setData] = useState<IIngredient>();

      useEffect(() => {
        let itemToShow = ingredients.find(({ _id }) => _id === id);
          setData(itemToShow);
      }, [id, ingredients]);

    return (
        <>
        {data ? (
        <div className={`${StyleProductDetails.container}`}>
            <p className={`text text_type_main-large ml-10 mt-10`}>Детали ингридиента</p>
            <div className={`${StyleProductDetails.description}`}>
                <img className={`mr-4 ml-4`} src={data.image_large} alt={data.name}/>
                <h3 className={`text text_type_main-medium`}>{data.name}</h3>

                <table className={`${StyleProductDetails.energyValue} mt-8 mb-15`}>
                    <tbody>
                    <tr>
                        <th className="text text_type_main-default text_color_inactive">Калории,ккал</th>
                        <th className="text text_type_main-default text_color_inactive">Белки, г</th>
                        <th className="text text_type_main-default text_color_inactive">Жиры, г</th>
                        <th className="text text_type_main-default text_color_inactive">Углеводы, г</th>
                    </tr>
                    <tr>
                        <th className="text text_type_main-default text_color_inactive">{data.calories}</th>
                        <th className="text text_type_main-default text_color_inactive">{data.proteins}</th>
                        <th className="text text_type_main-default text_color_inactive">{data.fat}</th>
                        <th className="text text_type_main-default text_color_inactive">{data.carbohydrates}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>) : null }
        </>
    )
}
