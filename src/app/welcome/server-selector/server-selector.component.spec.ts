import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerService } from '../server.service';
import { ServerSelectorComponent } from './server-selector.component';

describe('ServerSelectorComponent', () => {
  let component: ServerSelectorComponent;
  let fixture: ComponentFixture<ServerSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerSelectorComponent ],
      providers: [ ServerService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
