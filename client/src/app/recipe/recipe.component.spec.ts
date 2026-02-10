import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as config from '../app.config';
import * as testData from '../test/test-data'
import { routes } from '../app.routes';
import { Recipe } from '../models/recipe';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeComponent);
    fixture.componentRef.setInput("showStats", false);
    component = fixture.componentInstance;
    component.id.set(testData.RECIPE_1.id);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected HTML elements', () => {
    expect(fixture.componentInstance.error()).toBeFalsy();

    var topPane = fixture.nativeElement.querySelector('div[class="top-pane"]')

    expect(topPane).toBeTruthy();

    var recipeTitle = fixture.nativeElement.querySelector('div[id="title"]')
    var recipeDescription = fixture.nativeElement.querySelector('div[class="description"]')
    var recipeNote = fixture.nativeElement.querySelector('div[class="note"]')
    
    expect(recipeTitle).toBeTruthy();
    expect(recipeDescription).toBeTruthy();
    expect(recipeNote).toBeTruthy();
  })

  it('should fetch race data', waitForAsync(inject([HttpTestingController], async (mockHttp: HttpTestingController) => {
    const itemData: Recipe = testData.RECIPE_1;
    
    TestBed.inject(ApplicationRef).tick();
    fixture.detectChanges();
    mockHttp.expectOne(`/${config.DB_RECIPES_SERVICE}/${itemData.id}`).flush(itemData);

    await TestBed.inject(ApplicationRef).whenStable();
    fixture.detectChanges();

    // Check the skier data
    expect(fixture.componentInstance.error()).toBeFalsy();
    expect(fixture.componentInstance.isLoading()).toBe(false)
    var result = component.model()
    
    expect(result).toEqual(itemData);
    
    expect(component.title()).toEqual(itemData.title);
    expect(component.description()).toEqual(itemData.description);
    expect(component.note()).toEqual(itemData.note);
    
    mockHttp.verify();
  })))
});
