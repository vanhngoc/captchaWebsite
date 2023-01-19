import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfomationComponent } from './infomation.component';
import { INFOMATION_ROUTE } from './infomation.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([INFOMATION_ROUTE]), NgxSpinnerModule],
  declarations: [InfomationComponent],
})
export class InfomationModule {}
