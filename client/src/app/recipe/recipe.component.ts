import { Component, computed, input } from '@angular/core';
import { ModelComponent } from '../shared/model.component';
import { Recipe } from '../models/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../models/recipe.service';
import { RecipeIngredientsComponent } from "./recipe-ingredients.component";
import { RecipeDirectionsComponent } from './recipe-directions.component';

@Component({
  selector: 'app-recipe',
  imports: [RecipeIngredientsComponent, RecipeDirectionsComponent],
  templateUrl: './recipe.component.html',
  styleUrls: ['../app.component.css', './recipe.component.css']
})
export class RecipeComponent extends ModelComponent<Recipe> {
  showIngredients = input<boolean>(true);
  showDirections = input<boolean>(true);
  
  constructor(activatedRoute: ActivatedRoute, modelService: RecipeService) {
    super(activatedRoute, modelService)
  }

  title = computed(() => {
    if (this.isLoading()) {
      return("Loading...");
    }

    return this.model()?.title
  })

  description = computed(() => {
    if (this.isLoading()) {
      return("Loading...");
    }

    return this.model()?.description
  })

  note = computed(() => {
    if (this.isLoading()) {
      return("Loading...");
    }

    return this.model()?.note
  })
}
