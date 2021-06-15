import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoDetailsComponent } from './trabajo-details.component';

describe('TrabajoDetailsComponent', () => {
  let component: TrabajoDetailsComponent;
  let fixture: ComponentFixture<TrabajoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
