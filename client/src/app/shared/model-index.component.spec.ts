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
import { Recipe } from '../models/recipe';

describe('ModelIndexComponent', () => {
  const ENDPOINT_URL = 'ENDPOINT_URL';

  let component: ModelIndexComponent<Recipe>;
  let fixture: ComponentFixture<ModelIndexComponent<Recipe>>;

  let mockModelService = jasmine.createSpyObj('ModelService', {}, {'endpointUrl': ENDPOINT_URL});
  mockModelService.endpointUrl

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
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelIndexComponent<Recipe>);
  //  fixture.componentRef.setInput("showStats", false);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch item data', waitForAsync(inject([HttpTestingController], async (mockHttp: HttpTestingController) => {
    const itemData: Recipe[] = [testData.RECIPE_1, testData.RECIPE_2];
    
    TestBed.inject(ApplicationRef).tick();
    fixture.detectChanges();
    mockHttp.expectOne(`/${ENDPOINT_URL}`).flush(itemData);

    await TestBed.inject(ApplicationRef).whenStable();
    fixture.detectChanges();

    // Check the skier data
    expect(fixture.componentInstance.error()).toBeFalsy();
    expect(fixture.componentInstance.isLoading()).toBe(false)
    var result = component.values();
    
    expect(result).toEqual(itemData);

    mockHttp.verify();
  })))

});
