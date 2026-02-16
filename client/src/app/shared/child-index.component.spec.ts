import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import * as config from '../app.config';
import * as testData from '../test/test-data'
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { routes } from '../app.routes';
import { ApplicationRef } from '@angular/core';
import { ModelComponent } from './model.component';
import { ModelService } from '../models/model.service';
import { ModelIndexComponent } from './model-index.component';
import { ChildIndexComponent } from './child-index.component';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';


describe('ChildIndexComponent', () => {
  const ENDPOINT_URL = 'ENDPOINT_URL';
  const ENDPOINT_API = 'API';

  let component: ChildIndexComponent<Ingredient, Recipe>;
  let fixture: ComponentFixture<ChildIndexComponent<Ingredient, Recipe>>;

  let mockModelService = jasmine.createSpyObj('ModelService',
     {}, {'endpointUrl': ENDPOINT_URL, 'api': ENDPOINT_API});


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ModelService,
          useValue: mockModelService,
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildIndexComponent<Ingredient, Recipe>);
    fixture.componentRef.setInput("id", 1);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch race data', waitForAsync(inject([HttpTestingController], async (mockHttp: HttpTestingController) => {
    const itemData: Ingredient[] = [testData.INGREDIENT_1, testData.INGREDIENT_2];
    
    TestBed.inject(ApplicationRef).tick();
    fixture.detectChanges();
    mockHttp.expectOne(`${ENDPOINT_URL}/1/${ENDPOINT_API}`).flush(itemData);

    await TestBed.inject(ApplicationRef).whenStable();
    fixture.detectChanges();

    // Check the race data
    expect(fixture.componentInstance.error()).toBeFalsy();
    expect(fixture.componentInstance.isLoading()).toBe(false)
    var result = component.values();
    
    expect(result).toEqual(itemData);

    mockHttp.verify();
  })))

});
