import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelIndexComponent } from './model-index.component';

describe('ModelIndexComponent', () => {
  let component: ModelIndexComponent;
  let fixture: ComponentFixture<ModelIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
