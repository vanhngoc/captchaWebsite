import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { RegisterService } from './register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(254),
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-@]+[a-zA-Z0-9-\\+]+@gmail.com+$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // if already authenticated then navigate to home page
    this.checkLogin();
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
    this.activeInput();
  }

  checkLogin(): void {
    const rememberedUsername = this.cookieService.get('username');
    const rememberedPassword = this.cookieService.get('password');
    if (rememberedUsername && rememberedPassword) {
      this.loginForm.get('username')!.setValue(this.cookieService.get('username'));
      this.loginForm.get('password')!.setValue(this.cookieService.get('password'));
      this.loginForm.get('rememberMe')!.setValue(true);
    }
  }

  showToasterSuccessResg(): void {
    this.toastr.success('Đăng ký thành công !!', 'Thông báo');
  }

  showToasterError(message: string, info: string): void {
    this.toastr.error(message, info);
  }

  login(): void {
    this.spinner.show();
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe({
        next: () => {
          this.authenticationError = false;
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            if (!this.router.getCurrentNavigation()) {
              // There were no routing during login (eg from navigationToStoredUrl)
              this.router.navigate(['']);
            }
          }, 1000);
        },
        error: () =>
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            (this.authenticationError = true), this.showToasterError('Sai tên đăng nhập hoặc mật khẩu!!', 'Thông báo');
          }, 1000),
      });
  }

  clickBtn(): void {
    // const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelector('main');
    main?.classList.toggle('sign-up-mode');
    this.success = false;
  }

  activeInput(): void {
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(inp => {
      if (inp.nodeValue !== '') {
        inp.classList.add('active');
      } else {
        inp.addEventListener('focus', () => {
          inp.classList.add('active');
        });
      }
      inp.addEventListener('blur', () => {
        if (inp.nodeValue !== '') {
          return;
        }
        inp.classList.remove('active');
      });
    });
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    this.spinner.show();
    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.showToasterError('Xác nhận mật khẩu không trùng khớp!!', 'Thông báo');
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      this.registerService.save({ login, email, password, langKey: 'en' }).subscribe({
        next: () => {
          this.authenticationError = false;
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            (this.success = true), this.showToasterSuccessResg();
          }, 500);
        },
        error: response =>
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            this.processError(response);
          }, 500),
      });
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
      this.showToasterError('Tài khoản đã được sử dụng!!', 'Thông báo');
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
      this.showToasterError('Email đã được sử dụng!!', 'Thông báo');
    } else {
      this.error = true;
      this.showToasterError('Đăng ký thất bại, vui lòng thử lại!!', 'Thông báo');
    }
  }
}
