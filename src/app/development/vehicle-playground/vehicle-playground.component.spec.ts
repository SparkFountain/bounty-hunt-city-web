import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePlaygroundComponent } from './vehicle-playground.component';

describe('VehiclePlaygroundComponent', () => {
  let component: VehiclePlaygroundComponent;
  let fixture: ComponentFixture<VehiclePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclePlaygroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
