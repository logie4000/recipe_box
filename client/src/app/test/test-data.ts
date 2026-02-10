import { Direction } from "../models/direction";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";

export const RECIPE_1: Recipe = {
  id: 1,
  title: "Clam Chowder",
  description: "New England Clam Chowder",
  note: "Best served hot on a cold day",
  image: "some.image.com/file.jpg",
}

export const INGREDIENT_1: Ingredient = {
  id: 1,
  position: 1,
  value: "5 lbs clams",
}

export const INGREDIENT_2: Ingredient = {
  id: 1,
  position: 1,
  value: "2 cups heavy cream",
}

export const DIRECTION_1: Direction = {
  id: 1,
  position: 1,
  step: "Combine the ingredients",
}

export const DIRECTION_2: Direction = {
  id: 1,
  position: 1,
  step: "Simmer the chowder for 20 minutes",
}