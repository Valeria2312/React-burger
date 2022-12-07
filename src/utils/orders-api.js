import PropTypes from "prop-types";

export const createRequest = (showOrder, fullArrayBurgerIngredients) => {
    fetch(`https://norma.nomoreparties.space/api/orders`, {
        method: 'POST',
        body: JSON.stringify({ingredients: fullArrayBurgerIngredients.map(elem => elem._id)}),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => {return response.json();})
        .then(data => showOrder({ name: data.name, number: data.order.number }))
        .catch(err => {
            alert(err)
        })
}

createRequest.propTypes = {
    showOrder: PropTypes.func.isRequired,
    fullArrayBurgerIngredients: PropTypes.array.isRequired,
}
