import React, {useEffect, useMemo, useRef} from "react";
import StyleIngredients from "./BurgerIngridients.module.css"
import {ProductElem} from "../ProductElem/ProductElem";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useInView} from "react-intersection-observer";
import {IIngredient, useAppSelector} from "../../types/typesDataProduct";

export const BurgerIngredients = () => {
    const {ingredients} = useAppSelector(store => store.BurgerIngredients);
    const [chapter, setChapter] = React.useState('bun')

    const firstTab = "Булки";
    const secondTab = "Соусы";
    const thirdTab = "Начинки";
    const rootScroll = useRef<HTMLDivElement>(null);

    const arrBun = useMemo(() => ingredients.filter((item: IIngredient) => item.type === "bun"), [ingredients]);
    const arrSauce = useMemo(() => ingredients.filter((item: IIngredient) => item.type === "sauce"), [ingredients]);
    const arrMain = useMemo(() => ingredients.filter((item: IIngredient) => item.type === "main"), [ingredients]);

    const [ref, inView] = useInView({
        root: rootScroll.current,
        threshold: 0,
    })
    const [ref2, inView2] = useInView({
        root: rootScroll.current,
        rootMargin: "-100px",
        threshold: 0,
    })
    const [ref3, inView3] = useInView({
        root: rootScroll.current,
        threshold: 0.9,
    })
    useEffect(() => {
    if (inView) {
        setChapter("bun");
        return;
    }

    if (inView2) {
        setChapter("sauce");
        return;
    }

    if (inView3) {
        setChapter("main");
        return;
    }
}, [inView, inView2, inView3]);

    return (
        <section className="BurgerIngredients">
            <p className={`${StyleIngredients.headerConstructor} mt-10 mb-5 text text_type_main-large`}>Соберите
                бургер</p>
            <div className={`${StyleIngredients.tabs}`}>
                <Tab value={firstTab} active={chapter === "bun"} onClick={setChapter}>Булки</Tab>
                <Tab value={secondTab} active={chapter === "sauce"} onClick={setChapter} >Соусы</Tab>
                <Tab value={thirdTab} active={chapter === "main"} onClick={setChapter}>Начинки</Tab>
            </div>
            <div ref={rootScroll} className={`${StyleIngredients.ingredients}`}>

                <div ref={ref}
                     className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Булки
                </div>

                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrBun.map((product: IIngredient) => (
                        <ProductElem key={product._id} product={product}/>
                    ))}
                </div>

                <div ref={ref2}
                     className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Соусы
                </div>

                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrSauce.map((product: IIngredient) => (
                        <ProductElem key={product._id} product={product}/>
                    ))}
                </div>

                <div ref={ref3}
                     className={`${StyleIngredients.categoriesName} text text_type_main-medium mt-10`}>Начинки
                </div>

                <div className={`${StyleIngredients.categories} mt-6`}>
                    {arrMain.map((product: IIngredient) => (
                        <ProductElem key={product._id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
}