import React from "react";
import {CurrencyIcon, Counter, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import StyleIngredients from "./BurgerIngridients.module.css"
import PropTypes from "prop-types";


export const BurgerIngredients = ({ products }) => {

    const Tabs = () => {
        const [current, setCurrent] = React.useState('one')
        return (
            <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
            </div>
            )
    }
    Tabs.propTypes = {
        active: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    }

    const Product = ({ key, price, name, image}) => {
        return (
            <div className={`${StyleIngredients.product}`} key={key}>
                <img className={`mr-4 ml-4`} src={image}  alt="product"/>
                <Counter count={0} size="default" extraClass="m-1" />
                <h3 className={`${StyleIngredients.productName} text text_type_main-default`}>{name}</h3>
                <div className={`${StyleIngredients.productPrice} mt-1 mb-1`}>
                <p className={`mr-1 text text_type_digits-default`}>{price}</p>
                <CurrencyIcon type="primary" />
                </div>
            </div>
        );
    };

    Product.propTypes = {
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }

    const arrBun = [];
    const arrSauce = [];
    const arrMain = []

    products.map((product) => {
        if(product.type === "bun") {
            arrBun.push(product);
        } if (product.type === "sauce") {
            arrSauce.push(product);
        } if(product.type === "main") {
            arrMain.push(product);
        }
        return product;
    })

    return (
        <section className="BurgerIngredients">
            <p className={`${StyleIngredients.headerConstructor} mt-10 mb-5 text text_type_main-large`}>Соберите бургер</p>

            <Tabs />

            <div className={`${StyleIngredients.ingredients} mt-10`}>

                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium`}>Булки</div>
                <div className={`${StyleIngredients.categories} mt-6`}>
                {arrBun.map((product)=>(
                    <Product key={product.id} price={product.price} name={product.name} image={product.image}/>
                ))}
                </div>

                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium`}>Соусы</div>
                <div className={`${StyleIngredients.categories}`}>
                {arrSauce.map((product)=>(
                    <Product key={product.id} price={product.price} name={product.name} image={product.image}/>
                ))}
                </div>

                <div className={`${StyleIngredients.categoriesName} text text_type_main-medium`}>Начинки</div>
                <div className={`${StyleIngredients.categories}`}>
                {arrMain.map((product)=>(
                    <Product key={product.id} price={product.price} name={product.name} image={product.image}/>
                ))}

                </div>
            </div>
        </section>
    );
}
