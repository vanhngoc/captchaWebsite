import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, Validators } from '@angular/forms';
import { UserManagementService } from '../service/user-management.service';
import { UpdateCaptcha } from '../update/update-captcha.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'jhi-update-captcha',
  templateUrl: './update-captcha.component.html',
})
export class UpdateCaptchaComponent implements OnInit {
  updateCaptcha?: UpdateCaptcha;
  updateCaptchaForm = this.fb.group({
    username: ['', [Validators.required]],
    captcha: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userMgn: UserManagementService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('UpdateCaptchaComponent');
  }

  clear(): void {
    this.activeModal.dismiss('cancel');
  }
  showToasterSuccessResg(): void {
    this.toastr.success('Update captcha thành công !!', 'Thông báo');
  }
  confirmUpdateCaptcha(): void {
    this.spinner.show();

    this.updateCaptcha = this.updateCaptchaForm.value;

    this.userMgn.updateCaptcha(this.updateCaptchaForm.value).subscribe({
      next: () => {
        setTimeout(() => {
          this.spinner.hide();
          this.activeModal.close();
          this.showToasterSuccessResg();
        }, 1000);
      },
      error: () => {
        setTimeout(() => {
          this.spinner.hide();
          this.activeModal.close();
        }, 500);
      },
    });
  }
}
