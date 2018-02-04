import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-issues',
  templateUrl: './status-issues.component.html',
  styleUrls: ['./status-issues.component.scss']
})
export class StatusIssuesComponent implements OnInit {

  messages: object[];

  constructor() { }

  ngOnInit() {
    this.messages = [
      {
        'device': 'Some Device',
        'message': 'Test Issue'
      },
      {
        'device': 'This Device',
        'message': 'Another issue for this device'
      },
      {
        'device': 'That Device',
        'message': 'That device is whack but at least its not some device.'
      },
    ];
  }

}
