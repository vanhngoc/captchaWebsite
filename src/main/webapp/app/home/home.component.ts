import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import AOS from 'aos';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { LoginService } from 'app/login/login.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

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
    private loginService: LoginService,
    private modalService: NgbModal
  ) {
    if (sessionStorage.getItem('currentUser')) {
      // logged in so return true
      this.accountService
        .getAuthenticationState()
        .pipe(takeUntil(this.destroy$))
        .subscribe(account => (this.account = account));
    }
  }

  ngOnInit(): void {
    AOS.init();

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

  openModal(): void {
    this.modalService.open(ModalComponent, { size: 'lg', backdrop: 'static' });
    console.log('modalRef');
  }
}
