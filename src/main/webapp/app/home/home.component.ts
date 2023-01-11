import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import AOS from 'aos';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    AOS.init();
    if (sessionStorage.getItem('currentUser')) {
      // logged in so return true
      this.accountService
        .getAuthenticationState()
        .pipe(takeUntil(this.destroy$))
        .subscribe(account => (this.account = account));
    }

    window.addEventListener('scroll', this.headerScrolled, true);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // onscroll = (el: any, listener: any) => {
  //   el.addEventListener('scroll', listener)
  // }

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
}
