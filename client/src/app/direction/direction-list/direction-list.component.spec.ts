import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionListComponent } from './direction-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DirectionListComponent', () => {
  let component: DirectionListComponent;
  let fixture: ComponentFixture<DirectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
