import { Routes } from '@angular/router';
import { RecipeIndexComponent } from './recipe/recipe-index.component';
import { RecipeComponent } from './recipe/recipe.component';

export const routes: Routes = [
  {
     path: 'recipes',
     component: RecipeIndexComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeComponent
  }
];
