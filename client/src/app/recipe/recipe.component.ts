import { Component, computed } from '@angular/core';
import { ModelComponent } from '../shared/model.component';
import { Recipe } from '../models/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../models/recipe.service';

@Component({
  selector: 'app-recipe',
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrls: ['../app.component.css', './recipe.component.css']
})
export class RecipeComponent extends ModelComponent<Recipe> {

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
