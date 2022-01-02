import { useContext, useEffect, useRef, useState } from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../Layout/Modal';
import Cart from './Cart';
import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = () => {

    const [cartDisplayed, setCartDisplayed] = useState(false);
    const cartContext = useContext(CartContext);
    const [bumpState, setBumpState] = useState(false);

    useEffect(() => {
        setBumpState(true);
    }, [cartContext.totalItems])

    const removeBump = () => {
        setBumpState(false);
    }

    const showCart = () => {
        setCartDisplayed(true);   
    }

    const hideCart = () => {
      setCartDisplayed(false);
    };

    const nbItems = cartContext.totalItems;

    return (
        <>
            <button className={`${classes.button} ${bumpState && classes.bump}`} onClick={showCart} onAnimationEnd={removeBump}>
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your cart</span>
                <span className={classes.badge}>{nbItems}</span>
            </button>
            {cartDisplayed && (
                <Modal>
                    <Cart onClose={hideCart} />
                </Modal>
            )}
        </>
    );
}

export default HeaderCartButton;