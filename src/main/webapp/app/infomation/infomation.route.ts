import { Route } from '@angular/router';
import { InfomationComponent } from './infomation.component';

export const INFOMATION_ROUTE: Route = {
  path: ':login',
  component: InfomationComponent,
  data: {
    pageTitle: 'Infomation',
  },
};
