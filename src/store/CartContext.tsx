import { createContext, ReactNode, useReducer } from "react";
import { createBuilderStatusReporter } from "typescript";
import CartModel from "../models/CartModel";
import MealModel from "../models/MealModel";

type CartContextModel = {
    items: CartModel[];
    totalItems: number;
    onAddMeal: (meal: MealModel, amount: number) => void;
    incrementAmount: (meal: MealModel) => void;
    decrementAmount: (meal: MealModel) => void;
};

const CartContext = createContext<CartContextModel>({
    items: [],
    totalItems: 0,
    onAddMeal: (meal: MealModel, amount: number) => {},
    incrementAmount: (meal: MealModel) => {},
    decrementAmount: (meal: MealModel) => {},
});

type CartReducerState = { items: CartModel[], totalItems: number };
type CarteReducerAction = {
    meal: MealModel;
    amount: number;
};

const cartReducer = (state: CartReducerState, action: CarteReducerAction): CartReducerState => {
    let indexItem = state.items.findIndex((value) => {
        return value.meal.id === action.meal.id;
    });
    let items = [...state.items];
    let cartItem:CartModel;
    let totalItems = state.totalItems;
    if (indexItem === -1) {
        cartItem = new CartModel(action.meal, 0);
        indexItem = items.push(cartItem);
    }else{
        cartItem = {...items[indexItem]};
        items[indexItem] = cartItem;
    }
    cartItem.amount += action.amount;
    totalItems += action.amount;
    if(cartItem.amount <= 0){
        items = items.filter((value, index) => {
            return index !== indexItem;
        });
    }
    return { items: items, totalItems: totalItems};
};

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartState, cartDispatcher] = useReducer(cartReducer, { items: [], totalItems: 0 });
    const addMealHandler = (meal: MealModel, amount: number) => {
        cartDispatcher({ meal: meal, amount: amount });
    };

    const incrementAmountHandler = (meal: MealModel) => {
        cartDispatcher({ meal: meal, amount: 1 });
    };
    const decrementAmountHandler = (meal: MealModel) => {
        cartDispatcher({ meal: meal, amount: -1 });
    };

    return (
        <CartContext.Provider
            value={{
                items: cartState.items,
                totalItems: cartState.totalItems,
                onAddMeal: addMealHandler,
                incrementAmount: incrementAmountHandler,
                decrementAmount: decrementAmountHandler,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
