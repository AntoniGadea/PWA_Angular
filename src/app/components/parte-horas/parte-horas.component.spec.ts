import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteHorasComponent } from './parte-horas.component';

describe('ParteHorasComponent', () => {
  let component: ParteHorasComponent;
  let fixture: ComponentFixture<ParteHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParteHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
