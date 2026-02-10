import { Component } from '@angular/core';
import { ModelIndexComponent } from '../shared/model-index.component';
import { RecipeService } from '../models/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-index',
  imports: [],
  templateUrl: './recipe-index.component.html',
  styleUrls: ['../app.component.css', './recipe-index.component.css']
})
export class RecipeIndexComponent extends ModelIndexComponent<Recipe>{
  constructor(protected override modelService: RecipeService) {
    super(modelService)
  }

}
