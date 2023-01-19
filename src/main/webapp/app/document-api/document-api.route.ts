import { Route } from '@angular/router';
import { DocumentApiComponent } from './document-api.component';

export const DOCUMENT_API_ROUTE: Route = {
  path: '',
  component: DocumentApiComponent,
  data: {
    pageTitle: 'Document Api',
  },
};
