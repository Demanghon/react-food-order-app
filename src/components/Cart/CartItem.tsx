import { useContext } from 'react';
import CartModel from '../../models/CartModel';
import CartContext from '../../store/CartContext';
import classes from './CartItem.module.css'

const CartItem = ({item}:{item:CartModel}) => {

    const cartContext = useContext(CartContext);
    
    const decrementClickHandler = () => {
        console.log("decrement  handler");
        cartContext.decrementAmount(item.meal);
    }

    const incrementClickHandler = () => { 
        console.log("increment handler");
        cartContext.incrementAmount(item.meal);
    };
    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{item.meal.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{item.meal.price}</span>
                    <span className={classes.amount}>x {item.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={decrementClickHandler}>-</button>
                <button onClick={incrementClickHandler}>+</button>
            </div>
        </li>
    );
}

export default CartItem;