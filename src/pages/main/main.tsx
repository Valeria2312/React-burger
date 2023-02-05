import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/BurgerIngredients/BurgerIngridients";
import {BurgerConstructor} from "../../components/BurgerConstructor/BurgerConstructor";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../../types/typesDataProduct";

export const Main = () => {
    // const history = useHistory();
    // const { user } = useAppSelector(store => store.RegisterUser);
    // if (!user) {
    //     history.replace({ pathname: '/login' });
    // }
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </>
    )
}
