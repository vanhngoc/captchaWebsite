import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HistoryOrderManagementComponent } from './history-order-management.component';

@Injectable({ providedIn: 'root' })
export class HistoryOrderManagementResolve {}

export const historyOrderManagementRoute: Route = {
  path: '',
  component: HistoryOrderManagementComponent,
  data: {
    pageTitle: 'History Order Management',
  },
};
