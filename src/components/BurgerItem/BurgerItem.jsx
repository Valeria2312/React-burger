import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import {useDispatch} from 'react-redux';
import {useRef} from 'react';
import BurgerElem from "./BurgerItem.module.css";
import {DEL_INGREDIENT} from "../../services/actions/BurgerConstructor";
import PropTypes from "prop-types";

function BurgerItem({ing, index, moveIng}) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    console.log(index);

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
        hover: (item, monitor) => {
            if (!ref.current) return
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

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

BurgerItem.propTypes = {
    ing: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveIng: PropTypes.func.isRequired,
}