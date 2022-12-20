import {CheckResponse, requestAddress} from "../сonstants/ForQueries";
import PropTypes from "prop-types";

export const GetIngredients = (setIngredients, ingredients) => {
    setIngredients({...ingredients, error: false, loading: true});
    fetch(requestAddress + "/ingredients")
        .then(CheckResponse)
        .then((res) => {
            setIngredients({...ingredients, data: res.data, loading: false});
        })
        .catch((err) => {
            alert(err);
            setIngredients({...ingredients, error: true, loading: false});
        });
}

GetIngredients.propTypes = {
    setIngredients: PropTypes.func.isRequired,
    ingredients: PropTypes.object.isRequired,
}