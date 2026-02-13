import { Component } from '@angular/core';
import { Direction } from '../models/direction';
import { DirectionService } from '../models/direction.service';
import { ChildIndexComponent } from '../shared/child-index.component';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../models/recipe.service';
import { DirectionListComponent } from '../direction/direction-list/direction-list.component';

@Component({
  selector: 'app-recipe-directions',
  imports: [DirectionListComponent],
  templateUrl: './recipe-directions.component.html',
  styleUrl: './recipe-directions.component.css'
})
export class RecipeDirectionsComponent extends ChildIndexComponent<Direction, Recipe> {
  constructor(protected override modelService: DirectionService, protected override containerService: RecipeService) {
    super(modelService, containerService);
  }
}
