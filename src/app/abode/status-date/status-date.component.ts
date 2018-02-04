import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-status-date',
  templateUrl: './status-date.component.html',
  styleUrls: ['./status-date.component.scss']
})
export class StatusDateComponent implements OnInit {

  date: Date;

  constructor() { }

  ngOnInit() {
    const ticks$ = Observable.create( o => {
      const timer = setInterval(() => {
        o.next();
      }, 1000);

      return () => clearInterval(timer);
    });
    ticks$.subscribe(() => this.date = new Date());
    this.date = new Date();
  }

}
