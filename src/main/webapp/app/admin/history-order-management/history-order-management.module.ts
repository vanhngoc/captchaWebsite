import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HistoryOrderManagementComponent } from './history-order-management.component';
import { historyOrderManagementRoute } from './history-order-management.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([historyOrderManagementRoute]), NgxPaginationModule],
  declarations: [HistoryOrderManagementComponent],
})
export class HistoryOrderManagementModule {}
