import { Component, input } from '@angular/core';
import { RecipeService } from '../../models/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { ModelListComponent } from '../../shared/model-list.component';

@Component({
  selector: 'app-recipe-list',
  imports: [],
  templateUrl: './recipe-list.component.html',
  styleUrls: [ '../../app.component.css', './recipe-list.component.css' ]
})
export class RecipeListComponent extends ModelListComponent<Recipe> {

  constructor(override itemService: RecipeService, override router: Router) {
    super(itemService, router)
  }

  getTitle(recipe: Recipe) {
    return recipe.title;
  }

  getDescription(recipe: Recipe) {
    return recipe.description;
  }

  getNote(recipe: Recipe) {
    return recipe.note;
  }
}
