import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbodeComponent } from './abode.component';

describe('AbodeComponent', () => {
  let component: AbodeComponent;
  let fixture: ComponentFixture<AbodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
