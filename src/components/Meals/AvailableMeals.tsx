import dummy_meals from "../../data/dummy-meals";
import MealItem from "./MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../Layout/Card";

const AvailableMeals = () => {
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {dummy_meals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />;
          })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
