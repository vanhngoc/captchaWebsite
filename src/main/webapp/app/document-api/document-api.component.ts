import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'jhi-document-api',
  templateUrl: './document-api.component.html',
  styleUrls: ['./document-api.component.scss'],
})
export class DocumentApiComponent implements OnInit {
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
