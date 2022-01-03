import {FormEvent} from 'react';
import useInput from '../../hooks/use-input';
import classes from './CheckoutForm.module.css'

const isEmpty= (value:string):boolean => {return value.trim().length === 0};

const CheckoutForm = ({ onClose, onOrder }: { onClose: () => void; onOrder: () => void }) => {
    const { hasError: nameHasError, isTouched: nameIsTouched, blurHanlder: nameBlurHandler } = useInput(isEmpty);
    const { hasError: streetHasError, isTouched: streetIsTouched, blurHanlder: streetBlurHandler } = useInput(isEmpty);
    const { hasError: zipHasError, isTouched: zipIsTouched, blurHanlder: zipBlurHandler } = useInput(isEmpty);
    const { hasError: cityHasError, isTouched: cityIsTouched, blurHanlder: cityBlurHandler } = useInput(isEmpty);

    const formIsValid = nameIsTouched && streetIsTouched && zipIsTouched && cityIsTouched && !nameHasError && !streetHasError && !zipHasError && !cityHasError;

    const confirmHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //Validate the data and confirm the order
        if (formIsValid) {
            onOrder();
        }
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${nameHasError && classes.invalid}`}>
                <label htmlFor="name">Your Name </label>
                <input type="text" id="name" onBlur={nameBlurHandler} />
                {nameHasError && <span className={classes.error}>Your name is mandatory</span>}
            </div>
            <div className={`${classes.control} ${streetHasError && classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" onBlur={streetBlurHandler} />
                {streetHasError && <span className={classes.error}>Your name is mandatory</span>}
            </div>
            <div className={`${classes.control} ${zipHasError && classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" onBlur={zipBlurHandler} />
                {zipHasError && <span className={classes.error}>Your name is mandatory</span>}
            </div>
            <div className={`${classes.control} ${cityHasError && classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" onBlur={cityBlurHandler} />
                {cityHasError && <span className={classes.error}>Your name is mandatory</span>}
            </div>
            <div className={classes.actions}>
                <button onClick={onClose}>Close</button>
                <button type="submit" className={classes.submit} disabled={!formIsValid}>
                    Order
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;