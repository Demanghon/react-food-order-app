import MealModel from '../../models/MealModel';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';


const MealItem = ({meal} : {meal:MealModel}) => {
    const price_formatted = meal.price.toFixed(2);

    return (
      <li className={classes.meal}>
        <div>
          <h3>{meal.name}</h3>
          <div className={classes.description}>{meal.description}</div>
          <div className={classes.price}>${price_formatted}</div>
        </div>
        <div>
          <MealItemForm meal={meal} />
        </div>
      </li>
    );
}

export default MealItem;