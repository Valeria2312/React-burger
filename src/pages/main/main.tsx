import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/BurgerIngredients/BurgerIngridients";
import {BurgerConstructor} from "../../components/BurgerConstructor/BurgerConstructor";


export const Main = () => {

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </>
    )
}
