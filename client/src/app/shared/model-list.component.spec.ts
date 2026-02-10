import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListComponent } from './model-list.component';
import { Recipe } from '../models/recipe';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { ModelService } from '../models/model.service';

describe('ModelListComponent', () => {
  const ENDPOINT_URL = 'ENDPOINT_URL';

  let component: ModelListComponent<Recipe>;
  let fixture: ComponentFixture<ModelListComponent<Recipe>>;
  
  let mockModelService = jasmine.createSpyObj('ModelService', {}, {'endpointUrl': ENDPOINT_URL});
  mockModelService.endpointUrl
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelListComponent],
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

    fixture = TestBed.createComponent(ModelListComponent<Recipe>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
