import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

import * as config from '../app.config';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends ModelService<Recipe> {
  override endpointUrl = config.DB_RECIPES_SERVICE;
  override api = config.HOST_RECIPES_SERVICE;

  itemUrl(recipe: Recipe): string {
    return `/${config.HOST_RECIPES_SERVICE}/${recipe.id}`
  }
}
