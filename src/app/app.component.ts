import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Abode UI';

  loading: Boolean = false;

  constructor(private $state: StateService, private auth: AuthService) {
  }

  ngOnInit() {

    this.loading = true;
    this.auth.isAuthenticated()
      .subscribe(authenticated => {
        console.log(authenticated);
        this.loading = false;
        if (authenticated) {
          this.$state.go('home');
        } else {
          console.log('welcome');
          //this.$state.go('welcome');
        }
      });

  }
}
