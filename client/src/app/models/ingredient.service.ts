import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';
import { ModelService } from './model.service';

import * as config from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends ModelService<Ingredient> {
  override endpointUrl = config.DB_INGREDIENTS_SERVICE;
  override api = config.HOST_INGREDIENTS_SERVICE;

  itemUrl(ingredient: Ingredient): string {
    return `/${config.HOST_INGREDIENTS_SERVICE}/${ingredient.id}`
  }
}