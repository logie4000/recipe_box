import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import * as config from '../app.config';
import { RecipeService } from './recipe.service';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { RECIPE_1 } from '../test/test-data';
import { Recipe } from './recipe';

describe('RecipeService', () => {
    const SKIER_ID = 1;
    let service: RecipeService;
    let httpTestingController: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({      
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
      ]});
      service = TestBed.inject(RecipeService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should fetch model data', fakeAsync(inject([HttpTestingController], (mockHttp: HttpTestingController) => {
      const testData: Recipe = RECIPE_1;
  
      var recipe = service.fetchData(testData.id);
      
      recipe.subscribe((s) => {
        expect(s).withContext("service returned stub value").toEqual(testData);
      });
  
      mockHttp.expectOne(`/${config.DB_RECIPES_SERVICE}/${testData.id}`).flush(testData)
      tick();
      mockHttp.verify();
    })));

    it('should return the item URL', () => {
        expect(service.itemUrl(RECIPE_1)).toEqual(`/${config.HOST_RECIPES_SERVICE}/${RECIPE_1.id}`)
    })
  });
  