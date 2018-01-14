import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Server } from './server';
import { SERVERS } from './mock-servers';

@Injectable()
export class ServerService {

  constructor() { }

  getServers(): Observable<Server[]> {
    return of(SERVERS);
  }

}
