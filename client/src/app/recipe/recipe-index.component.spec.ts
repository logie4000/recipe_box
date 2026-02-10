import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeIndexComponent } from './recipe-index.component';
import * as config from '../app.config';
import * as testData from '../test/test-data'
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { School } from '../models/school';
import { Recipe } from '../models/recipe';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('RecipeIndexComponent', () => {
  let component: RecipeIndexComponent;
  let fixture: ComponentFixture<RecipeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeIndexComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch item data', waitForAsync(inject([HttpTestingController], async (mockHttp: HttpTestingController) => {
    const itemData: Recipe[] = [ testData.RECIPE_1, testData.RECIPE_2 ];
    
    TestBed.inject(ApplicationRef).tick();
    fixture.detectChanges();
    mockHttp.expectOne(`/${config.DB_RECIPES_SERVICE}`).flush(itemData);

    await TestBed.inject(ApplicationRef).whenStable();
    fixture.detectChanges();

    // Check the item data
    expect(fixture.componentInstance.error()).toBeFalsy();
    expect(fixture.componentInstance.isLoading()).toBe(false);
    var items = component.values();
    
    expect(items).toEqual(itemData);
    
    mockHttp.verify();
  })))
});
