import MealModel from "./MealModel";

class CartModel {
  constructor(public readonly meal: MealModel, public amount:number) {}
}

export default CartModel;