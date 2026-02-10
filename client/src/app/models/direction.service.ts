import { Injectable } from '@angular/core';
import * as config from '../app.config';

import { ModelService } from './model.service';
import { Direction } from './direction';

@Injectable({
  providedIn: 'root'
})
export class DirectionService extends ModelService<Direction> {
  override endpointUrl = config.DB_DIRECTIONS_SERVICE;
  override api = config.HOST_DIRECTIONS_SERVICE;

  itemUrl(direction: Direction): string {
    return `/${config.HOST_DIRECTIONS_SERVICE}/${direction.id}`
  }
}