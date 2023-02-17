import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from 'app/core/request/request.model';
import { HistoryOrder } from 'app/infomation/HistoryOrder.model';
import { createRequestOption } from 'app/core/request/request-util';
import { IHistoryOrderManagement } from './history-order-mngt.model';

@Injectable({ providedIn: 'root' })
export class HistoryOrderManagementService {
  constructor(private http: HttpClient) {}

  query(req?: Pagination): Observable<HttpResponse<IHistoryOrderManagement[]>> {
    const options = createRequestOption(req);
    return this.http.get<IHistoryOrderManagement[]>('api/admin/history-orders', { params: options, observe: 'response' });
  }
}
