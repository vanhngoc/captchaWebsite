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
  styleUrls: ['./update-captcha.component.scss'],
})
export class UpdateCaptchaComponent implements OnInit {
  captcha?: number;
  updateCaptcha?: UpdateCaptcha;
  updateCaptchaForm = this.fb.group({
    merchantKey: ['', [Validators.required]],
    captcha: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    totalCost: [''],
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

  get totalCost(): number {
    if (this.captcha! < 10000) {
      return this.captcha! * 15;
    } else if (this.captcha! >= 10000 && this.captcha! < 50000) {
      return this.captcha! * 10;
    } else {
      return this.captcha! * 8;
    }
  }

  showToasterSuccessResg(): void {
    this.toastr.success('Update captcha thành công !!', 'Thông báo');
  }
  confirmUpdateCaptcha(): void {
    this.spinner.show();

    this.updateCaptcha = this.updateCaptchaForm.value;
    this.updateCaptcha!.totalCost = this.totalCost;
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
