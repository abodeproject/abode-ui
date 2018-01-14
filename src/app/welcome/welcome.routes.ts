import { RouterModule, Routes } from '@angular/router';

import {  WelcomeComponent  } from './welcome.component';

const WelcomeRoutes: Routes = [{
  path: 'welcome',
  component: WelcomeComponent
}];
export const WelcomeRouting = RouterModule.forChild(WelcomeRoutes);
