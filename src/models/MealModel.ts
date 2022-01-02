class MealModel {
  constructor(
        public readonly id: string, 
        public readonly name: string, 
        public readonly description: string, 
        public readonly price: number){};
}

export default MealModel;