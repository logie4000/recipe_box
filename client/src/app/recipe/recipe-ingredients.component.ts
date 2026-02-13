import { Component } from '@angular/core';
import { ChildIndexComponent } from '../shared/child-index.component';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { IngredientService } from '../models/ingredient.service';
import { RecipeService } from '../models/recipe.service';
import { IngredientListComponent } from "../ingredient/ingredient-list/ingredient-list.component";

@Component({
  selector: 'app-recipe-ingredients',
  imports: [IngredientListComponent],
  templateUrl: './recipe-ingredients.component.html',
  styleUrl: './recipe-ingredients.component.css'
})
export class RecipeIngredientsComponent extends ChildIndexComponent<Ingredient, Recipe> {
  constructor(protected override modelService: IngredientService, protected override containerService: RecipeService) {
    super(modelService, containerService);
  }

}
