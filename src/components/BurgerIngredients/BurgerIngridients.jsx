import React, {useEffect, useMemo, useRef} from "react";
import StyleIngredients from "./BurgerIngridients.module.css"
import {ProductElem} from "../ProductElem/ProductElem";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/BurgerIngridients";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerIngredients = () => {
    const {ingredients} = useSelector(store => store.BurgerIngredients);
    const [chapter, setChapter] = React.useState('bun')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    // Якори
    const chapters = {
        menu: useRef(null),
        bun: useRef(null),
        sauce: useRef(null),
        main: useRef(null),
    }

    const arrBun = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const arrSauce = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const arrMain = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);

    //обработка поведения скролла по табам
    const handleScroll = () => {
        const menuTop = chapters.menu.current.getBoundingClientRect().top;
        //подсчет верхних границ разделов
        const bunTop = Math.abs(chapters.bun.current.getBoundingClientRect().top - menuTop);
        const sauceTop = Math.abs(chapters.sauce.current.getBoundingClientRect().top - menuTop);
        const mainTop = Math.abs(chapters.main.current.getBoundingClientRect().top - menuTop);
        // логика изменения chapter
        if (bunTop < sauceTop) {
            setChapter('Булки');
        }
        if (sauceTop < mainTop) {
            setChapter('Соусы');
        } else {
            setChapter('Начинки');
        }
    }
    //scroll
    const onChapterClick = (type) => {
        console.log(type);
        console.log(chapters[type].current);
        setChapter(type);
        chapters[type].current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <section className="BurgerIngredients">
            <p className={`${StyleIngredients.headerConstructor} mt-10 mb-5 text text_type_main-large`}>Соберите
                бургер</p>
            <div ref={chapters.menu} className={`${StyleIngredients.tabs}`}>
                <Tab value="bun" active={chapter === 'bun'} onClick={onChapterClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={chapter === 'sauce'} onClick={onChapterClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={chapter === 'main'} onClick={onChapterClick}>
                    Начинки
                </Tab>
            </div>
            <div onScroll={handleScroll} className={`${StyleIngredients.ingredients}`}>
                <div ref={chapters.bun}
                     className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Булки
                </div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrBun.map((product) => (
                        <ProductElem key={product._id} product={product}/>
                    ))}
                </div>

                <div ref={chapters.sauce}
                     className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Соусы
                </div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrSauce.map((product) => (
                        <ProductElem key={product._id} product={product}/>
                    ))}
                </div>

                <div ref={chapters.main}
                     className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Начинки
                </div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrMain.map((product) => (
                        <ProductElem key={product._id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    // ingredients: PropTypes.arrayOf(PropTypes.shape(typesDataProduct)).isRequired,
};