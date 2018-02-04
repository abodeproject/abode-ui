import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {

  constructor(private config: ConfigService) { }

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
            if (result.status) {
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

  public call(url: String, data: Object): Observable<object> {

    console.log(url, data);
    return Observable.create(observable => {
      observable.next({});
      observable.complete();
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
}
