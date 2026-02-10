import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListComponent } from './model-list.component';
import { Recipe } from '../models/recipe';

describe('ModelListComponent', () => {
  let component: ModelListComponent<Recipe>;
  let fixture: ComponentFixture<ModelListComponent<Recipe>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelListComponent]
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
