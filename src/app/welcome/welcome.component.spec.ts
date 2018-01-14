import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeModule } from './welcome.module';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let rendered: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ WelcomeModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    rendered = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a "Select Server" step', () => {
    expect(rendered.textContent).toContain('Select a Server');
  });

  it('should contain a "Login" step', () => {
    expect(rendered.textContent).toContain('Login');
  });

  it('should contain a "Select Device" step', () => {
    expect(rendered.textContent).toContain('Select a Device');
  });

  it('should contain a "Select Interface" step', () => {
    expect(rendered.textContent).toContain('Select an Interface');
  });
});
