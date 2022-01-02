import Input from "../Layout/Input";
import { useContext, useRef } from "react";
import classes from "./MealItemForm.module.css";
import MealModel from "../../models/MealModel";
import CartContext from "../../store/CartContext";

interface MealItemFormProps {
  meal: MealModel;
}

const MealItemForm = ({ meal }: MealItemFormProps) => {
  const cartContext = useContext(CartContext);
  const amountRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    cartContext.onAddMeal(meal, +amountRef.current!.value);
  };

  return (
      <form className={classes.form} onSubmit={submitHandler}>
          <Input
              label="amount"
              ref={amountRef}
              input={{
                  id: `amount_${meal.id}`,
                  type: "number",
                  min: "1",
                  max: "5",
                  step: "1",
                  defaultValue: "1",
              }}
          ></Input>
          <button type="submit">+ Add</button>
      </form>
  );
};

export default MealItemForm;
