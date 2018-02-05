import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import {HttpErrorResponse} from '@angular/common/http';

describe('AuthService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [AuthService, ConfigService]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    return expect(service).toBeTruthy();
  }));

  describe('AuthService.call', () => {
    it('should exist', inject([AuthService], (service: AuthService) => {
      return expect(service.call instanceof Function).toBeTruthy();
    }));

    it('should return an observable', inject([AuthService], (service: AuthService) => {
      return expect(service.call('/api/auth', {}) instanceof Observable).toBeTruthy();
    }));

    it('observable should return json', async(inject([AuthService], (service: AuthService) => {

      service.call('/api/auth', {})
        .subscribe(() => {
          fail('Call was expected to fail');
        }, (err) => {
          expect(err instanceof HttpErrorResponse);
        });

      const mockCall = httpMock.expectOne('/api/auth');
      mockCall.error(new ErrorEvent('ERROR'));
      // mockCall.flush({'status': 'success'});
      httpMock.verify();

    })));

  });

  describe('AuthService.isAuthorized', () => {
    it('should exist', inject([AuthService], (service: AuthService) => {
      return expect(service.isAuthenticated instanceof Function).toBeTruthy();
    }));

    it('should return an observable', inject([AuthService], (service: AuthService) => {
      return expect(service.isAuthenticated() instanceof Observable).toBeTruthy();
    }));
  });

  describe('AuthService.verify', () => {
    it('should exist', inject([AuthService], (service: AuthService) => {
      return expect(service.verify instanceof Function).toBeTruthy();
    }));

    it('should return an observable', inject([AuthService], (service: AuthService) => {
      return expect(service.verify() instanceof Observable).toBeTruthy();
    }));
  });

  describe('AuthService.login', () => {
    it('should exist', inject([AuthService], (service: AuthService) => {
      return expect(service.login instanceof Function).toBeTruthy();
    }));

    it('should return an observable', inject([AuthService], (service: AuthService) => {
      return expect(service.login() instanceof Observable).toBeTruthy();
    }));
  });

  describe('AuthService.logout', () => {
    it('should exist', inject([AuthService], (service: AuthService) => {
      return expect(service.logout instanceof Function).toBeTruthy();
    }));

    it('should return an observable', inject([AuthService], (service: AuthService) => {
      return expect(service.logout() instanceof Observable).toBeTruthy();
    }));
  });

  describe('AuthService.refresh', () => {
    it('should exist', inject([AuthService], (service: AuthService) => {
      return expect(service.refresh instanceof Function).toBeTruthy();
    }));

    it('should return an observable', inject([AuthService], (service: AuthService) => {
      return expect(service.refresh() instanceof Observable).toBeTruthy();
    }));
  });
});
