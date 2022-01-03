import { useContext } from "react";
import CartContext from "../../store/CartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

type CloseHandler = () => void;

interface CartProps {
    onClose: CloseHandler;
}

const Cart = ({ onClose }: CartProps) => {
    const cartContext = useContext(CartContext);
    const total = cartContext.items
        .reduce<number>((prevValue, value) => {
            return prevValue + value.amount * value.meal.price;
        }, 0)
        .toFixed(2);


    const orderHandler = () => {
        cartContext.clear();
        onClose();
    }
    return (
        <>
            {cartContext.items.length === 0 && (
                <div className={classes.empty}>
                    <span>Your Cart is empty!</span>
                    <div className={classes.actions}>
                        <button className={classes.button} onClick={onClose}>
                            Choose your meal
                        </button>
                    </div>
                </div>
            )}
            {cartContext.items.length > 0 && (
                <div>
                    <ul className={classes["cart-items"]}>
                        {cartContext.items.map((cartItem) => (
                            <CartItem key={cartItem.meal.id} item={cartItem}></CartItem>
                        ))}
                    </ul>
                    <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>${total}</span>
                    </div>

                    <CheckoutForm onClose={onClose} onOrder={orderHandler} />
                </div>
            )}
        </>
    );
};

export default Cart;
