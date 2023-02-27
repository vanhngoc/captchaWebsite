import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoryOrder } from 'app/infomation/HistoryOrder.model';
import { HistoryOrderManagementService } from './history-order-management.service';
import { IHistoryOrderManagement } from './history-order-mngt.model';
import { User } from '../user-management/user-management.model';

@Component({
  selector: 'jhi-history-order-mgmt',
  templateUrl: './history-order-management.component.html',
  styleUrls: ['./history-order-management.component.scss'],
})
export class HistoryOrderManagementComponent implements OnInit {
  isLoading = false;

  itemsPerPage!: number | undefined;
  page!: number | undefined; //;
  predicate!: string;
  totalItems = 0;
  ascending!: boolean;

  historyOrders: IHistoryOrderManagement[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private historyService: HistoryOrderManagementService) {}
  ngOnInit(): void {
    this.loadAll();
    console.log('HistoryOrderManagementComponent');
  }

  loadAll(): void {
    this.isLoading = true;
    this.historyService
      .query({
        page: 0,
        size: 1000,
        sort: [],
      })
      .subscribe({
        next: (res: HttpResponse<IHistoryOrderManagement[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false),
      });
  }
  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: null,
      },
    });
  }
  formatDateTime(date: Date): string {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  trackUser(item: User): string {
    return item.login!;
  }
  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? 'asc' : 'desc'}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(historyOrders: HistoryOrder[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.historyOrders = historyOrders ?? [];
  }
}
