// import PropTypes from "prop-types";
// import {CheckResponse, requestAddress} from "../Сonstants/ForQueries";
//
// export const createRequest = (orderArr) => {
//     console.log(orderArr);
//     fetch(requestAddress + `/orders`, {
//         method: 'POST',
//         body: JSON.stringify({ingredients: orderArr}),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(CheckResponse)
//         .then((res) => {
//             console.log(res);
//         })
// }
//
// createRequest.propTypes = {
//     showOrder: PropTypes.func.isRequired,
//     fullArrayBurgerIngredients: PropTypes.array.isRequired,
// }