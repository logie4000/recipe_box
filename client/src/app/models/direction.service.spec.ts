import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import * as config from '../app.config';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { DIRECTION_1 } from '../test/test-data';
import { DirectionService } from './direction.service';
import { Direction } from './direction';


describe('DirectionService', () => {
    const SKIER_ID = 1;
    let service: DirectionService;
    let httpTestingController: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({      
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
      ]});
      service = TestBed.inject(DirectionService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should fetch model data', fakeAsync(inject([HttpTestingController], (mockHttp: HttpTestingController) => {
      const testData: Direction = DIRECTION_1;
  
      var recipe = service.fetchData(testData.id);
      
      recipe.subscribe((s) => {
        expect(s).withContext("service returned stub value").toEqual(testData);
      });
  
      mockHttp.expectOne(`${config.DB_DIRECTIONS_SERVICE}/${testData.id}`).flush(testData)
      tick();
      mockHttp.verify();
    })));

    it('should return the item URL', () => {
        expect(service.itemUrl(DIRECTION_1)).toEqual(`${config.HOST_DIRECTIONS_SERVICE}/${DIRECTION_1.id}`)
    })
  });
  