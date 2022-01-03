import MealItem from "./MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../Layout/Card";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
import MealModel from "../../models/MealModel";

const AvailableMeals = () => {
    const { isLoading, error, sendRequest } = useHttp();
    const [mealsAvailable, setMealsAvailable] = useState<MealModel[]>([]);

    const transformToMeals = (meals: any) => {
        const mealsTransformed: MealModel[] = [];
        for (const key in meals) {
            mealsTransformed.push(new MealModel(key, meals[key].name, meals[key].description, meals[key].price as number));
        }
        setMealsAvailable(mealsTransformed);
    };

    useEffect(() => {
        sendRequest("https://react-http-request-a7926-default-rtdb.europe-west1.firebasedatabase.app/meals.json", transformToMeals);
    }, [sendRequest]);
    return (
        <section className={classes.meals}>
            <Card>
                {!isLoading && mealsAvailable.length > 0 && 
                    <ul>
                        {mealsAvailable.map((meal) => {
                            return <MealItem key={meal.id} meal={meal} />;
                        })}
                    </ul>
                }
                {isLoading && <p>Is loading....</p>}
                {!isLoading && error &&  <p>{error}</p>}
            </Card>
        </section>
    );
};

export default AvailableMeals;
