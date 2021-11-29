import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentPlaygroundComponent } from './development-playground.component';

describe('DevelopmentPlaygroundComponent', () => {
  let component: DevelopmentPlaygroundComponent;
  let fixture: ComponentFixture<DevelopmentPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentPlaygroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
