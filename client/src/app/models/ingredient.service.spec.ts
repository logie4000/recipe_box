import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import * as config from '../app.config';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { INGREDIENT_1 } from '../test/test-data';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient';

describe('IngredientService', () => {
    const SKIER_ID = 1;
    let service: IngredientService;
    let httpTestingController: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({      
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
      ]});
      service = TestBed.inject(IngredientService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should fetch model data', fakeAsync(inject([HttpTestingController], (mockHttp: HttpTestingController) => {
      const testData: Ingredient = INGREDIENT_1;
  
      var recipe = service.fetchData(testData.id);
      
      recipe.subscribe((s) => {
        expect(s).withContext("service returned stub value").toEqual(testData);
      });
  
      mockHttp.expectOne(`/${config.DB_INGREDIENTS_SERVICE}/${testData.id}`).flush(testData)
      tick();
      mockHttp.verify();
    })));

    it('should return the item URL', () => {
        expect(service.itemUrl(INGREDIENT_1)).toEqual(`/${config.HOST_INGREDIENTS_SERVICE}/${INGREDIENT_1.id}`)
    })
  });
  