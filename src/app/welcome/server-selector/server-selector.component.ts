import {Component, Input, OnInit} from '@angular/core';

import { Server } from '../server';
import { ServerService} from '../server.service';

@Component({
  selector: 'app-server-selector',
  templateUrl: './server-selector.component.html',
  styleUrls: ['./server-selector.component.scss']
})
export class ServerSelectorComponent implements OnInit {

  servers: Server[];
  @Input() server: any;
  @Input() select: any;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.getServers();
  }

  getServers(): void {
    this.serverService.getServers()
      .subscribe(servers => this.servers = servers);
  }

  selectServer(server: Server): void {
    this.server.setValue(server.name);
    if (this.select) {
      this.select();
    }
  }
}
