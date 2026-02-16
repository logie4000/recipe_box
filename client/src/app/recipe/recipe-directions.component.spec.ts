import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDirectionsComponent } from './recipe-directions.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

import * as testData from '../test/test-data'

describe('RecipeDirectionsComponent', () => {
  let component: RecipeDirectionsComponent;
  let fixture: ComponentFixture<RecipeDirectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDirectionsComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDirectionsComponent);
    fixture.componentRef.setInput("id", testData.RECIPE_1.id);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
