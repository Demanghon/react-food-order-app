import { createContext, ReactNode, useReducer } from "react";
import CartModel from "../models/CartModel";
import MealModel from "../models/MealModel";

type CartContextModel = {
    items: CartModel[];
    totalItems: number;
    onAddMeal: (meal: MealModel, amount: number) => void;
    incrementAmount: (meal: MealModel) => void;
    decrementAmount: (meal: MealModel) => void;
    clear: () => void;
};

const CartContext = createContext<CartContextModel>({
    items: [],
    totalItems: 0,
    onAddMeal: (meal: MealModel, amount: number) => {},
    incrementAmount: (meal: MealModel) => {},
    decrementAmount: (meal: MealModel) => {},
    clear: () => {}
});

type CartReducerState = { items: CartModel[], totalItems: number };
type ClearTypeAction = { discriminator:"ClearTypeAction" };
type IncrementTypeAction = {discriminator:"IncrementTypeAction" , meal: MealModel; amount: number };
type CarteReducerAction = {
    type: IncrementTypeAction | ClearTypeAction;
};

const cartReducer = (state: CartReducerState, action: CarteReducerAction): CartReducerState => {
    const type = action.type;
    if (type.discriminator === "IncrementTypeAction") {
        let indexItem = state.items.findIndex((value) => {
            return value.meal.id === type.meal.id;
        });
        let items = [...state.items];
        let cartItem: CartModel;
        let totalItems = state.totalItems;
        if (indexItem === -1) {
            cartItem = new CartModel(type.meal, 0);
            indexItem = items.push(cartItem);
        } else {
            cartItem = { ...items[indexItem] };
            items[indexItem] = cartItem;
        }
        cartItem.amount += type.amount;
        totalItems += type.amount;
        if (cartItem.amount <= 0) {
            items = items.filter((value, index) => {
                return index !== indexItem;
            });
        }
        return { items: items, totalItems: totalItems };
    }

     if (type.discriminator === "ClearTypeAction") {
         return { items: [], totalItems: 0 };
     }
     return { items: [], totalItems: 0 };
};

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartState, cartDispatcher] = useReducer(cartReducer, { items: [], totalItems: 0 });
    const addMealHandler = (meal: MealModel, amount: number) => {
        cartDispatcher({ type: { discriminator: "IncrementTypeAction", meal: meal, amount: amount } });
    };

    const incrementAmountHandler = (meal: MealModel) => {
        cartDispatcher({ type: { discriminator: "IncrementTypeAction", meal: meal, amount: +1 } });
    };
    const decrementAmountHandler = (meal: MealModel) => {
        cartDispatcher({ type: { discriminator: "IncrementTypeAction", meal: meal, amount: -1 } });
    };

    const clear = () => {
        cartDispatcher({ type: { discriminator: "ClearTypeAction" } });
    } 

    return (
        <CartContext.Provider
            value={{
                items: cartState.items,
                totalItems: cartState.totalItems,
                onAddMeal: addMealHandler,
                incrementAmount: incrementAmountHandler,
                decrementAmount: decrementAmountHandler,
                clear: clear,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
