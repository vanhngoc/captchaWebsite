import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from './password.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'jhi-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss'],
})
export class InfomationComponent implements OnInit {
  account: Account | null = null;
  account$?: Observable<Account | null>;

  doNotMatch = false;
  error = false;
  success = false;

  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  private readonly destroy$ = new Subject<void>();

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
    window.addEventListener('scroll', this.headerScrolled, true);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
  headerScrolled(): void {
    const y = window.scrollY;
    if (y > 100) {
      const header = document.getElementById('header')!;
      header.classList.add('header-scrolled');
    } else if (y < 100) {
      const header = document.getElementById('header')!;
      header.classList.remove('header-scrolled');
    }
  }
  showToasterSuccess(): void {
    this.toastr.success('Đổi mật khẩu thành công !!', 'Thông báo');
  }

  showToastError(): void {
    this.toastr.error('Đã có lỗi, hãy kiểm tra lại mật khẩu cũ !!', 'Thông báo');
  }

  showToastErrorNotMatch(): void {
    this.toastr.error('Xác nhận mật khẩu không trùng khớp!!', 'Thông báo');
  }
  changePassword(): void {
    this.error = false;
    this.success = false;
    this.doNotMatch = false;

    const newPassword = this.passwordForm.get(['newPassword'])!.value;
    if (newPassword !== this.passwordForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
      this.showToastErrorNotMatch();
    } else {
      this.spinner.show();

      this.passwordService.save(newPassword, this.passwordForm.get(['currentPassword'])!.value).subscribe({
        next: () =>
          setTimeout(() => {
            this.spinner.hide();
            this.success = false;
            this.showToasterSuccess();
          }, 1000),
        error: () =>
          setTimeout(() => {
            this.spinner.hide();
            this.error = true;
            this.showToastError();
          }, 500),
      });
    }
  }

  activeNavMobile(): void {
    const navbar = document.getElementById('navbar')!;
    navbar.classList.toggle('navbar-mobile');
    // navbar.classList.toggle('bi-list')
    navbar.classList.toggle('bi-x');
  }

  dropdownNavMobile(): void {
    const dropdown = document.getElementById('dropdownUL')!;
    console.log(dropdown);
    dropdown.classList.toggle('dropdown-active');
  }
}
