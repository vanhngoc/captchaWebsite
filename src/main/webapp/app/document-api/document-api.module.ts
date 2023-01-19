import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { DocumentApiComponent } from './document-api.component';
import { DOCUMENT_API_ROUTE } from './document-api.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([DOCUMENT_API_ROUTE])],
  declarations: [DocumentApiComponent],
})
export class DocumentApiModule {}
