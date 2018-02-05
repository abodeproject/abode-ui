import { Injectable } from '@angular/core';

class Auth {
  client_token: string;
  auth_token: string;
  refresh_token: string;
}

class Config {
  server: string;
  auth: Auth;
}

@Injectable()
export class ConfigService {

  private config: Config;

  constructor() {
    const raw_config = window.localStorage.getItem('abode') || '{}';

    try {
      this.config = JSON.parse(raw_config);
    } catch (e) { }
  }

  public get auth() {
    return this.config.auth;
  }

  public get server() {
    return this.config.server;
  }
}
