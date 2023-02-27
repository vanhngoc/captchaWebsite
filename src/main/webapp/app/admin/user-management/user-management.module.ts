import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { UserManagementComponent } from './list/user-management.component';
import { UserManagementDetailComponent } from './detail/user-management-detail.component';
import { UserManagementUpdateComponent } from './update/user-management-update.component';
import { UserManagementDeleteDialogComponent } from './delete/user-management-delete-dialog.component';
import { userManagementRoute } from './user-management.route';
import { UpdateCaptchaComponent } from './list/update-captcha.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { OrderModule } from 'ngx-order-pipe';
import { DescendingPipe } from './list/descending.pipe';
@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(userManagementRoute), NgxSpinnerModule, OrderModule],
  declarations: [
    DescendingPipe,
    UserManagementComponent,
    UserManagementDetailComponent,
    UserManagementUpdateComponent,
    UserManagementDeleteDialogComponent,
    UpdateCaptchaComponent,
  ],
  exports: [DescendingPipe],
  entryComponents: [UserManagementDeleteDialogComponent],
})
export class UserManagementModule {}
