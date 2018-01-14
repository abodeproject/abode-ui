import { TestBed, async } from '@angular/core/testing';
import { UIRouterModule } from "@uirouter/angular";
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import {ContentComponent} from './abode/content/content.component';

describe('AppComponent', () => {
  const fixture;
  const app;
  const rendered;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        UIRouterModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    rendered = fixture.debugElement.nativeElement;
  });


  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('Abode UI');
  }));
});
