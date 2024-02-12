import { Ingredient } from '../types/entities';

export function getIngredientString(ingredients: Ingredient[]) {
  return ingredients.map(ingredient => ingredient.name).join(', ');
}
export function getAmount(amount: number) {
  return amount;
}
