import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-status-time',
  templateUrl: './status-time.component.html',
  styleUrls: ['./status-time.component.scss']
})
export class StatusTimeComponent implements OnInit {

  time: Date;

  constructor() { }

  ngOnInit() {
    const ticks$ = Observable.create( o => {
      const timer = setInterval(() => {
        o.next();
      }, 1000);

      return () => clearInterval(timer);
    });
    ticks$.subscribe(() => this.time = new Date());
    this.time = new Date();
  }

}
