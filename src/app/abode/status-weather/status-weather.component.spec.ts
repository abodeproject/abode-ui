import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusWeatherComponent } from './status-weather.component';

describe('StatusWeatherComponent', () => {
  let component: StatusWeatherComponent;
  let fixture: ComponentFixture<StatusWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
