import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { routes } from '../../app.routes';
import { ModelService } from '../../models/model.service';

describe('RecipeListComponent', () => {
  const ENDPOINT_URL = 'ENDPOINT_URL';

  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  let mockModelService = jasmine.createSpyObj('ModelService', {}, {'endpointUrl': ENDPOINT_URL});
  mockModelService.endpointUrl
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListComponent],
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

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
