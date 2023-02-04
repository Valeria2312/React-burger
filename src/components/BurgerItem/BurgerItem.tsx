import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import {useDispatch} from 'react-redux';
import {useRef} from 'react';
import BurgerElem from "./BurgerItem.module.css";
import {DEL_INGREDIENT} from "../../services/actions/BurgerConstructor";
import {IIngredient, useAppDispatch} from "../../types/typesDataProduct";

type TElementProps = {
    ing: IIngredient;
    moveIng: (moveIndex: number, hoverIndex: number) => void;
    index: number;
};

function BurgerItem({ing, index, moveIng}: TElementProps ) {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const [{isDragging}, dragRef] = useDrag({
        type: 'item',
        item: {index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })


    const onHandleDel = () => {
        dispatch({
            type: DEL_INGREDIENT,
            index: index,
        })
    }

    const [, drop] = useDrop({
        accept: 'item',
        hover: (item: IIngredient, monitor: object) => {
            if (!ref.current) return

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // @ts-ignore
            const hoverActualY = monitor?.getClientOffset().y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveIng(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    dragRef(drop(ref));


    return (
        <div className={`${BurgerElem.elem}`} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ing.name}
                price={ing.price}
                thumbnail={ing.image}
                handleClose={() => onHandleDel()}
            />
        </div>
    )
}

export default BurgerItem

// BurgerItem.propTypes = {
//     ing: PropTypes.object.isRequired,
//     index: PropTypes.number.isRequired,
//     moveIng: PropTypes.func.isRequired,
// }