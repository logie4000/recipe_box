import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { Direction } from '../../models/direction';
import { DirectionService } from '../../models/direction.service';

@Component({
  selector: 'app-direction-list',
  imports: [],
  templateUrl: './direction-list.component.html',
    styleUrls: [ '../../app.component.css', '../../recipe/recipe.component.css', './direction-list.component.css' ]
})
export class DirectionListComponent {
  directionList = input<Direction[] | undefined>([]);

  constructor(private router: Router, private directionService: DirectionService) {
    
  }

  getDirections(): Direction[] {
    var list = this.directionList();
    if (list == undefined) {
      return [];
    } else {
      return list;
    }
  }
}
