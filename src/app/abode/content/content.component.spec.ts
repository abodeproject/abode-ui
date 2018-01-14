import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';

@Component({
  template: '<app-content>Hello World</app-content>'
})
class TestContentComponent {}

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let rendered;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentComponent, TestContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const test_component = TestBed.createComponent(TestContentComponent);
    test_component.detectChanges();
    rendered = test_component.debugElement.nativeElement;

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render hello world', async(() => {
    expect(rendered.querySelector('.content-cell').textContent).toContain('Hello World');
  }));

});
