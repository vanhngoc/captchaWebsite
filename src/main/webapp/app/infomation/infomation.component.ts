import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss'],
})
export class InfomationComponent implements OnInit {
  account: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router) {}

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
}
