import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { InfomationComponent } from './infomation.component';
import { INFOMATION_ROUTE } from './infomation.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([INFOMATION_ROUTE])],
  declarations: [InfomationComponent],
})
export class InfomationModule {}
