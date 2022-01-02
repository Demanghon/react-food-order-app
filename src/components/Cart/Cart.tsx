import { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

type CloseHandler = () => void;

interface CartProps {
  onClose: CloseHandler;
}

const Cart = ({ onClose }: CartProps) => {
  const cartContext = useContext(CartContext);
  const total = cartContext.items.reduce<number>((prevValue, value) => {
      return prevValue + (value.amount * value.meal.price);
  }, 0).toFixed(2);
  return (
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
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          Close
        </button>
        <button className={`${classes["button--alt"]} ${classes["button"]}`}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
