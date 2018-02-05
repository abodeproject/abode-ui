import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public isAuthenticated(): Observable<boolean> {
    return Observable.create(observable => {
      setTimeout(() => {
        // If no server is configured, fail observable
        if (!this.config.server) {
          observable.next(false);
          return observable.complete();
        }

        // If no auth is configured, fail observable
        if (!this.config.auth) {
          observable.next(false);
          return observable.complete();
        }

        // Check out auth status
        this.verify()
          .subscribe(result => {
            if (result) {
              observable.next(false);
              return observable.complete();
            } else {
              observable.next(true);
              return observable.complete();
            }
          });
      }, 3000);
    });
  }

  public verify(): Observable<object> {
    return Observable.create(observable => {
      observable.next({});
      observable.complete();
    });
  }

  public refresh(): Observable<object> {
    return Observable.create(observable => {
      observable.next({});
      observable.complete();
    });
  }

  public login(): Observable<object> {
    return Observable.create(observable => {
      observable.next({});
      observable.complete();
    });
  }

  public logout(): Observable<object> {
    return Observable.create(observable => {
      observable.next({});
      observable.complete();
    });
  }

  public call(url: string, data: object): Observable<HttpResponse<object>> {

    return this.http.get(url, { observe: 'response' });

  }
}
