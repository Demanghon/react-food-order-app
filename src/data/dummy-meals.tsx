import MealModel from "../models/MealModel";

const DUMMY_MEALS: MealModel[] = [
  new MealModel("m1", "Sushi", "Finest fish and veggies", 22.99),
  new MealModel("m2", "Schnitzel", "A german specialty!", 16.5),
  new MealModel("m3", "Barbecue Burger", "American, raw, meaty", 12.99),
  new MealModel("m4", "Green Bowl", "Healthy...and green...", 18.99)
];

export default DUMMY_MEALS;
