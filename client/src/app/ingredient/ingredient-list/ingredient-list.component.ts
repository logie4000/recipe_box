import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientService } from '../../models/ingredient.service';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-ingredient-list',
  imports: [],
  templateUrl: './ingredient-list.component.html',
  styleUrls: [ '../../app.component.css', './ingredient-list.component.css' ]
})
export class IngredientListComponent {
  ingredientList = input<Ingredient[] | undefined>([]);

  constructor(private router: Router, private ingredientService: IngredientService) {
    
  }

  getIngredients(): Ingredient[] {
    var list = this.ingredientList();
    if (list == undefined) {
      return [];
    } else {
      return list;
    }
  }
}
